// Import necessary modules
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const morgan = require('morgan');
const rfs = require('rotating-file-stream');
const passport = require('./passportConfig');
const db = require('./db');

// Load environment variables from .env file
require('dotenv').config();

// Define server port and log directory, with default values
const PORT = process.env.PORT || 3000;
const LOG_DIR = process.env.LOG_DIR || './logs';

// Create an Express application instance
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Initialize passport for JWT authentication
app.use(passport.initialize());

// Setup rotating log stream for logging HTTP requests
const rotatingLogStream = rfs.createStream('access.log', {
  interval: '1d',
  path: LOG_DIR
});

// Use morgan middleware for logging
app.use(morgan('combined', { stream: rotatingLogStream }));

/**
 * Endpoint for user login and receiving a JWT token
 */
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

    // Compare provided password with stored password hash
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION || '1h',
    });

    res.json({ token });
  } catch (error) {
    console.error('Error during authentication:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * Endpoint to retrieve providers from the database
 * Accepts optional limit and offset parameters in the request body for pagination
 */
app.post('/api/providers', (req, res) => {
  const { limit = 20, offset = 0 } = req.body || {};
  const query = {
    text: `
      SELECT
        *
      FROM providers_view
      LIMIT $1 OFFSET $2
    `,
    values: [limit, offset],
  }
  db.query(query)
    .then(({ rows: providers }) => res.status(200).json(providers))
    .catch(error => {
      console.error('Error during provider export', error);
      res.status(500).json({ message: 'Internal server error' });
    });
});

/**
 * Endpoint to retrieve keywords from the database
 * Accepts optional limit and offset parameters in the request body for pagination
 */
app.post('/api/keywords', async (req, res) => {
  const { limit = 20, offset = 0 } = req.body || {};
  const query = {
    text: `
      SELECT 
        *
      FROM keywords_view
      LIMIT $1 OFFSET $2
    `,
    values: [limit, offset],
  }
  db.query(query)
    .then(({ rows: keywords }) => res.status(200).json(keywords))
    .catch(error => {
      console.error('Error during keyword export', error);
      res.status(500).json({ message: 'Internal server error' });
    });
});

/**
 * Protected route to retrieve collections from the database
 * Requires a valid JWT token to access
 */
app.post('/api/collections', async (req, res) => {
  const { limit = 20, offset = 0 } = req.body || {};
  const query = {
    text: `
      SELECT
        stac_version,
        stac_extensions,
        type,
        id,
        title,
        description,
        license,
        extent,
        item_assets,
        summaries,
        (
          SELECT ARRAY_AGG(k.keyword)
          FROM keywords k
          WHERE c.id = k.id
        ) AS keywords,
        (
          SELECT ARRAY_AGG(p.provider)
          FROM providers p
          WHERE c.id = p.id
        ) AS providers,
        (
          SELECT ARRAY_AGG(
            jsonb_build_object(
              'href', CONCAT('/api/items/', i.id),
              'rel', 'item'
            )
          )
          FROM items i
          WHERE c.id = i.collection
        ) || jsonb_build_object(
          'href', CONCAT('/api/collections/', c.id),
          'rel', 'self'
        ) AS links
      FROM collections c
      LIMIT $1 OFFSET $2
    `,
    values: [limit, offset],
  };

  db.query(query)
    .then(({ rows: collections }) => res.status(200).json(collections))
    .catch(error => {
      console.error('Error during collection export', error);
      res.status(500).json({ message: 'Internal server error' });
    });
});

/**
 * Endpoint to retrieve items from the database
 * Accepts optional limit and offset parameters in the request body for pagination
 */
app.post('/api/items', async (req, res) => {
  const { limit = 20, offset = 0 } = req.body;
  const query = {
    text: `
      SELECT 
        stac_version,
        stac_extensions,
        type,
        id,
        collection,
        geometry,
        bbox,
        (
          SELECT json_agg(x)
          FROM (
            SELECT 
              p.description,
              p.datetime,
              p.start_datetime,
              p.end_datetime,
              p."mlm:name",
              (
                SELECT json_agg(t.task)
                FROM mlm_tasks t
                WHERE i.collection = t.collection
                  AND i.id = t.id
              ) AS "mlm:tasks",
              p."mlm:architecture",
              p."mlm:framework",
              p."mlm:framework_version",
              p."mlm:memory_size",
              p."mlm:total_parameters",
              p."mlm:pretrained",
              p."mlm:pretrained_source",
              p."mlm:batch_size_suggestion",
              p."mlm:accelerator",
              p."mlm:accelerator_constrained",
              p."mlm:accelerator_summary",
              p."mlm:accelerator_count",
              p."mlm:input",
              p."mlm:output",
              p."mlm:hyperparameters"
            FROM properties p
            WHERE i.collection = p.collection
              AND i.id = p.id
          ) x
        ) AS properties,
        assets,
        links
      FROM items i
      LIMIT $1
      OFFSET $2
    `,
    values: [limit, offset]
  };

  db.query(query)
    .then(({ rows: items }) => res.status(200).json(items))
    .catch(error => {
      console.error('Error during item export:', error);
      res.status(500).json({ message: 'Internal server error' });
    })
});

app.post('/api/collections/upload', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const user = req.user.username
  const { stac_version = null, stac_extensions = null, type = null, id = null, title = null, description = null, license = null, extent = null, summaries = null, providers = null, keywords = null } = req.body;

  try {
    await db.query('BEGIN');

    const insertCollectionQuery = {
      text: `
        INSERT INTO collections (stac_version, stac_extensions, type, id, title, description, license, extent, summaries, CREATION_USER, UPDATE_USER)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $10)
      `,
      values: [stac_version, stac_extensions, type, id, title, description, license, extent, summaries, user]
    }
    await db.query(insertCollectionQuery);

    if (providers) {
      const insertProviderQuery = {
        text: `
        INSERT INTO providers (id, provider, CREATION_USER, UPDATE_USER)
        VALUES ($1, $2, $3, $3)
      `
      }
      for (const provider of providers) {
        await db.query(insertProviderQuery, [id, provider, user])
      }
    }

    if (keywords) {
      const insertKeywordQuery = {
        text: `
        INSERT INTO keywords (id, keyword, CREATION_USER, UPDATE_USER)
        VALUES ($1, $2, $3, $3)
      `
      }
      for (const keyword of keywords) {
        await db.query(insertKeywordQuery, [id, keyword, user])
      }
    }

    await db.query('COMMIT');
    res.status(200).json({ message: 'Collection uploaded successfully' });
  } catch (error) {
    await db.query('ROLLBACK');
    res.status(500).json({ message: 'Internal server error' });
  }
})

app.post('/api/items/upload', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const user = req.user.username;
  const {
    stac_version = null,
    stac_extensions = null,
    type = null,
    id = null,
    collection = null,
    geometry = null,
    bbox = null,
    properties = null,
    assets = null,
    links = null,
  } = req.body;
  const {
    description = null,
    datetime = null,
    start_datetime = null,
    end_datetime = null,
    "mlm:name": mlmName = null,
    "mlm:tasks": mlmTasks = null,
    "mlm:architecture": mlmArchitecture = null,
    "mlm:framework": mlmFramework = null,
    "mlm:framework_version": mlmFrameworkVersion = null,
    "mlm:memory_size": mlmMemorySize = null,
    "mlm:total_parameters": mlmTotalParameters = null,
    "mlm:pretrained": mlmPretrained = null,
    "mlm:pretrained_source": mlmPretrainedSource = null,
    "mlm:batch_size_suggestion": mlmBatchSizeSuggestion = null,
    "mlm:accelerator": mlmAccelerator = null,
    "mlm:accelerator_constrained": mlmAcceleratorConstrained = null,
    "mlm:accelerator_summary": mlmAcceleratorSummary = null,
    "mlm:accelerator_count": mlmAcceleratorCount = null,
    "mlm:input": mlmInput = null,
    "mlm:output": mlmOutput = null,
    "mlm:hyperparameters": mlmHyperparameters = null,
  } = properties;


  try {
    await db.query('BEGIN');

    const insertItemsQuery = {
      text: `
      INSERT INTO items (
        stac_version,
        stac_extensions,
        type,
        id,
        collection,
        geometry,
        bbox,
        assets,
        links,
        creation_user,
        update_user
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $10)
    `,
      values: [
        stac_version,
        stac_extensions,
        type,
        id,
        collection,
        geometry,
        bbox,
        assets,
        links,
        user,
      ],
    };
    await db.query(insertItemsQuery);

    const insertPropertiesQuery = {
      text: `
      INSERT INTO properties (
        id,
        collection,
        description,
        datetime,
        start_datetime,
        end_datetime,
        "mlm:name",
        "mlm:architecture",
        "mlm:framework",
        "mlm:framework_version",
        "mlm:memory_size",
        "mlm:total_parameters",
        "mlm:pretrained",
        "mlm:pretrained_source",
        "mlm:batch_size_suggestion",
        "mlm:accelerator",
        "mlm:accelerator_constrained",
        "mlm:accelerator_summary",
        "mlm:accelerator_count",
        "mlm:input",
        "mlm:output",
        "mlm:hyperparameters",
        creation_user,
        update_user
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $23)
    `,
      values: [
        id,
        collection,
        description,
        datetime,
        start_datetime,
        end_datetime,
        mlmName,
        mlmArchitecture,
        mlmFramework,
        mlmFrameworkVersion,
        mlmMemorySize,
        mlmTotalParameters,
        mlmPretrained,
        mlmPretrainedSource,
        mlmBatchSizeSuggestion,
        mlmAccelerator,
        mlmAcceleratorConstrained,
        mlmAcceleratorSummary,
        mlmAcceleratorCount,
        mlmInput,
        mlmOutput,
        mlmHyperparameters,
        user
      ],
    };
    await db.query(insertPropertiesQuery);

    if (mlmTasks) {
      const insertTasksQuery = {
        text: `
      INSERT INTO mlm_tasks (
        id,
        collection,
        task,
        creation_user,
        update_user
      )
      VALUES ($1,$2,$3,$4,$4)
      `
      }

      for (const task of mlmTasks) {
        await db.query(insertTasksQuery, [id, collection, task, user]);
      }
    }

    await db.query('COMMIT');
    res.status(200).json({ message: 'Item uploaded successfully' });
  } catch (error) {
    await db.query('ROLLBACK');
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

