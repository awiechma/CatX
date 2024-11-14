const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('./passportConfig'); // Import configured Passport instance
const db = require('./db'); // Database connection
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON data
app.use(express.json());

// Initialize Passport middleware
app.use(passport.initialize());

// Endpoint for logging in and receiving a JWT token
app.post('/api/token', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  try {
    // Query the database to find the user by username
    const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    // Check if the provided password matches the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    // Generate a JWT token if authentication is successful
    const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION || '1h',
    });

    res.json({ token });
  } catch (error) {
    console.error('Error during authentication:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/providers', (req, res) => {
  const { limit = 20, offset = 0 } = req.body || {}; //default limit and offset
  db.query('SELECT * FROM providers_view LIMIT $1 OFFSET $2', [limit, offset])
    .then(result => {
      const providers = result.rows;
      res.status(200).json(providers);
    })
    .catch(error => {
      console.error('Error during provider export:', error);
      res.status(500).json({ message: 'Internal server error' });
    });
})
//passport.authenticate('jwt', { session: false })  
app.post('/api/keywords', async (req, res) => {
  const { limit = 20, offset = 0 } = req.body || {}; //default limit and offset
  db.query('SELECT * FROM keywords_view LIMIT $1 OFFSET $2', [limit, offset])
    .then(result => {
      const keywords = result.rows
      res.status(200).json(keywords)
    }).catch(error => {
      console.error('Error during keyword export:', error);
      res.status(500).json({ message: 'Internal server error' });
    });
});
// Protected route that requires a valid JWT token to access
app.post('/api/collections', async (req, res) => {
  const { limit = 20, offset = 0 } = req.body || {}; //default limit and offset
  db.query('SELECT *, ARRAY(SELECT keyword FROM keywords k WHERE c.collection_id = k.collection_id) AS keywords, ARRAY(SELECT provider FROM providers p WHERE c.collection_id = p.collection_id) as providers FROM collections c LIMIT $1 OFFSET $2', [limit, offset])
    .then(result => {
      const collections = result.rows
      res.status(200).json(collections)
    }).catch(error => {
      console.error('Error during collection export:', error);
      res.status(500).json({ message: 'Internal server error' });
    })
});

app.post('/api/items', async (req, res) => {
  const { limit = 20, offset = 0 } = req.body || {}; //default limit and offset)
  db.query('SELECT *, ARRAY(SELECT task FROM mlm_tasks t WHERE i.collection = t.collection AND i.id = t.id) AS \"mlm:tasks\", (SELECT json_agg(x) FROM (SELECT description, datetime, \"mlm:name\", \"mlm:architecture\", \"mlm:framework\", \"mlm:framework_version\", \"mlm:memory_size\", \"mlm:total_parameters\", \"mlm:pretrained\", \"mlm:pretrained_source\",  \"mlm:batch_size_suggestion\", \"mlm:accelerator\", \"mlm:accelerator_constrained\", \"mlm:accelerator_summary\",  \"mlm:accelerator_count\", \"mlm:input\", \"mlm:output\", \"mlm:hyperparameters\" FROM properties p WHERE i.collection = p.collection AND i.id = p.id) x) AS properties FROM items i LIMIT $1 OFFSET $2', [limit, offset])
    .then(result => {
      const items = result.rows
      res.status(200).json(items)
    }).catch(error => {
      console.error('Error during item export:', error);
      res.status(500).json({ message: 'Internal server error' });
    })
})
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
