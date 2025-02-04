// Import necessary modules
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const morgan = require('morgan');
const rfs = require('rotating-file-stream');
const passport = require('./passportConfig');
const db = require('./db');
const cors = require('cors');

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
const rotatingLogStream = rfs.createStream('http.log', {
  interval: '1d',
  path: LOG_DIR
});

// Use morgan middleware for logging
app.use(morgan('combined', { stream: rotatingLogStream }));

// Erlaube CORS für alle Ursprünge (kann eingeschränkt werden)
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

/**
 * Endpoint for Creating new Users
 */

app.post('/api/register', async (req, res) => {
  const { username, full_name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password);
  if (!username || !password || !full_name || !email) {
    return res.status(400).json({ message: 'You did not fill in all required fields.' });
  };

  try {
    // Insert the user
    const insertUserQuery = {
      text: `
        INSERT INTO users (username, full_name, email, password_hash, CREATION_USER, UPDATE_USER)
        VALUES ($1, $2, $3, $4, $1, $1)
      `,
      values: [username, full_name, email, hashedPassword]
    }
    await db.query(insertUserQuery);
    res.status(200).json({ message: 'Registration Successful' })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

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

app.get('/api/validatetoken', passport.authenticate('jwt', { session: false }), (req, res) => {
  if (req.user) {
    res.status(200).json({ message: 'Token is valid' });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
})


app.get('/api/user/:username', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const username = req.params.username;
  if (!username) {
    return res.status(400).json({ message: 'Username is required.' });
  }
  if (req.user.role < 2 && username != req.user.username) {
    return res.status(403).json({ message: 'Forbidden.' });
  }
  const query = {
    text: `
        SELECT username, full_name, email, role
        FROM users
        WHERE username = $1
      `,
    values: [username],
  }

  db.query(query)
    .then(({ rows: user }) => res.status(200).json((user.length > 0) ? user[0] : {}))
    .catch(error => {
      console.error('Error during user export', error);
      res.status(500).json({ message: 'Internal server error' });
    });
});


/**
 * Endpoint to retrieve providers from the database
 * Accepts optional limit and offset parameters in the request body for pagination
 */
app.get('/api/providers', (req, res) => {
  const limit = req.params.limit || 20;
  const offset = req.params.offset || 0;
  const query = {
    text: `
      SELECT
        *
      FROM providers_view
      LIMIT $1
      OFFSET $2
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
app.get('/api/keywords', async (req, res) => {
  const limit = req.params.limit || 20;
  const offset = req.params.offset || 0;
  const query = {
    text: `
      SELECT 
        *
      FROM keywords_view
      LIMIT $1
      OFFSET $2
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

app.get('/api/mlmtasks', async (req, res) => {
  const limit = req.params.limit || 20;
  const offset = req.params.offset || 0;
  const query = {
    text: `
      SELECT 
        *
      FROM mlm_tasks_view
      LIMIT $1
      OFFSET $2
    `,
    values: [limit, offset],
  }
  db.query(query)
    .then(({ rows: mlmtasks }) => res.status(200).json(mlmtasks))
    .catch(error => {
      console.error('Error during mlmtask export', error);
      res.status(500).json({ message: 'Internal server error' });
    });
})

app.get('/api/recent-items', async (req, res) => {
  try {
    const result = await db.query(`
          SELECT * FROM items_complete_view
          ORDER BY update_date DESC
          LIMIT 10
      `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/stac/conformance', async (req, res) => {
  const query = {
    text: `
      SELECT conformsTo AS "conformsTo"
      FROM catalog
    `
  }
  db.query(query)
    .then(({ rows: conforms }) => res.status(200).json((conforms.length > 0) ? conforms[0] : {}))
    .catch(error => {
      console.error('Error during collection export', error);
      res.status(500).json({ message: 'Internal server error' });
    });
})


app.get('/stac', async (req, res) => {
  const query = {
    text: `
      SELECT *
      FROM catalog_complete_view
    `
  }

  db.query(query)
    .then(({ rows: catalog }) => res.status(200).json((catalog.length > 0) ? catalog[0] : {}))
    .catch(error => {
      console.error('Error during collection export', error);
      res.status(500).json({ message: 'Internal server error' });
    });
})


/**
 * route to retrieve items from database
 * allows search via search=<searchTerm> in descripition or item id
 * allows search via tasks=<task1,task2,task3> in mlm:tasks
 */
app.get('/api/search', async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;
  const tasks = req.query.tasks || null;
  const searchTerm = req.query.search || null;

  let baseQuery = `
    SELECT *
    FROM items_complete_view
  `;
  let queryValues = [limit + 1, offset];
  let filters = [];

  if (tasks) {
    filters.push(`properties->'mlm:tasks' @> $${filters.length + 3}`);
    queryValues.push(JSON.stringify(tasks.split(',')));
  }

  if (searchTerm) {
    filters.push(`(properties->>'description' ILIKE $${filters.length + 3} OR id ILIKE $${filters.length + 3})`);
    queryValues.push(`%${searchTerm}%`);
  }

  if (filters.length > 0) {
    baseQuery += ` WHERE ${filters.join(' AND ')}`;
  }

  const finalQuery = {
    text: `${baseQuery} LIMIT $1 OFFSET $2`,
    values: queryValues
  };

  let itemcol = {
    type: "FeatureCollection",
    features: [],
    links: [
      {
        rel: "self",
        href: `http://localhost:3000/stac/search?limit=${limit}&offset=${offset}${tasks ? `&tasks=${tasks}` : ''}${searchTerm ? `&search=${searchTerm}` : ''}`
      }
    ],
    context: {
      page: (offset / limit) + 1,
      limit: limit
    }
  }
  if (offset > 0) {
    itemcol.links.push({
      rel: "prev",
      href: `http://localhost:3000/stac/search?limit=${limit}&offset=${(offset - limit) > 0 ? 0 : (offset - limit)}${tasks ? `&tasks=${tasks}` : ''}${searchTerm ? `&search=${searchTerm}` : ''}`
    })
  }
  db.query(finalQuery)
    .then(({ rows: items }) => {
      if (items.length > limit) {
        itemcol.links.push({
          rel: "next",
          href: `http://localhost:3000/stac/search?limit=${limit}&offset=${offset + limit}${tasks ? `&tasks=${tasks}` : ''}${searchTerm ? `&search=${searchTerm}` : ''}`
        })
        items.pop();
      }
      itemcol.context.returned = items.length;
      itemcol.features = items;
      res.status(200).json(itemcol);
    })
    .catch(error => {
      console.error('Error during item export:', error);
      res.status(500).json({ message: 'Internal server error' });
    });
});


/**
 * Protected route to retrieve collections from the database
 * Requires a valid JWT token to access
 */

app.get('/stac/collections', async (req, res) => {
  const limit = req.params.limit || 20;
  const offset = req.params.offset || 0;
  const query = {
    text: `
      SELECT *
      FROM collections_complete_view
      LIMIT $1
      OFFSET $2
    `,
    values: [limit, offset],
  };

  db.query(query)
    .then(({ rows: collections }) => {
      const sanitizedCollections = collections.map(collection => {
        const { audit, ...rest } = collection;
        return rest;
      });
      res.status(200).json(sanitizedCollections);
    })
    .catch(error => {
      console.error('Error during collection export', error);
      res.status(500).json({ message: 'Internal server error' });
    });
});

/**
 * Protected route to retrieve just one collection from the database
 */
app.get('/stac/collections/:cid', async (req, res) => {
  const collection_id = req.params.cid;
  const query = {
    text: `
      SELECT *
      FROM collections_complete_view
      WHERE id = $1
    `,
    values: [collection_id],
  };

  db.query(query)
    .then(({ rows: collections }) => {
      const sanitizedCollections = collections.map(collection => {
        const { audit, ...rest } = collection;
        return rest;
      });
      res.status(200).json((sanitizedCollections.length > 0) ? sanitizedCollections[0] : {});
    })
    .catch(error => {
      console.error('Error during collection export', error);
      res.status(500).json({ message: 'Internal server error' });
    });
});

/**
 * Endpoint to retrieve items of one collection from the database
 * Accepts optional limit and offset parameters in the request body for pagination
 */
app.get('/stac/collections/:cid/items', async (req, res) => {
  const limit = parsInt(req.params.limit) || 10;
  const offset = parseInt(req.params.offset) || 0;
  const collection_id = req.params.cid;
  const query = {
    text: `
      SELECT * 
      FROM items_complete_view
      WHERE collection = $3
      LIMIT $1
      OFFSET $2
    `,
    values: [limit + 1, offset, collection_id]
  };

  let itemcol = {
    type: "FeatureCollection",
    features: [],
    links: [
      {
        rel: "self",
        href: `http://localhost:3000/stac/collections/${collection_id}/items?limit=${limit}&offset=${offset}`
      }
    ],
    context: {
      page: (offset / limit) + 1,
      limit: limit
    }
  }
  if (offset > 0) {
    itemcol.links.push({
      rel: "prev",
      href: `http://localhost:3000/stac/collections/${collection_id}/items?limit=${limit}&offset=${(offset - limit) < 0 ? 0 : offset - limit}`
    })
  }
  db.query(query)
    .then(({ rows: items }) => {
      const sanitizedItems = items.map(item => {
        const { audit, ...rest } = item;
        return rest;
      });
      if (sanitizedItems.length > limit) {
        itemcol.links.push({
          rel: "next",
          href: `http://localhost:3000/stac/collections/${collection_id}/items?limit=${limit}&offset=${offset + limit}`
        });
        sanitizedItems.pop();
      }
      itemcol.context.returned = sanitizedItems.length;
      itemcol.features = sanitizedItems;
      res.status(200).json(itemcol);
    })
    .catch(error => {
      console.error('Error during item export:', error);
      res.status(500).json({ message: 'Internal server error' });
    })
});

/**
 * Endpoint to retrieve items of one collection from the database
 * Accepts optional limit and offset parameters in the request body for pagination
 */
app.get('/stac/collections/:cid/items/:iid', async (req, res) => {
  const collection_id = req.params.cid;
  const item_id = req.params.iid;
  const query = {
    text: `
      SELECT * 
      FROM items_complete_view
      WHERE collection = $1
      AND id = $2
    `,
    values: [collection_id, item_id]
  };

  db.query(query)
    .then(({ rows: items }) => {
      const sanitizedItems = items.map(item => {
        const { audit, ...rest } = item;
        return rest;
      });
      res.status(200).json((sanitizedItems.length > 0) ? sanitizedItems[0] : {});
    })
    .catch(error => {
      console.error('Error during item export:', error);
      res.status(500).json({ message: 'Internal server error' });
    })
});

/**
 * Endpoint to retrieve items from the database
 * Accepts optional limit and offset parameters in the request body for pagination
 */
app.get('/api/items', async (req, res) => {
  const limit = req.params.limit || 20;
  const offset = req.params.offset || 0;
  const query = {
    text: `
      SELECT * 
      FROM items_complete_view
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


/**
 * Endpoint to retrieve a single item by its ID from the database
 */
app.get('/api/items/:itemid', async (req, res) => {
  const itemId = req.params.itemid;
  const query = {
    text: `
      SELECT * 
      FROM items_complete_view
      WHERE id = $1
    `,
    values: [itemId]
  };

  db.query(query)
    .then(({ rows: items }) => {
      if (items.length > 0) {
        res.status(200).json(items[0]);
      } else {
        res.status(404).json({ message: 'Item not found' });
      }
    })
    .catch(error => {
      console.error('Error during item export:', error);
      res.status(500).json({ message: 'Internal server error' });
    });
});

/**
 * Endpoint to upload a collection to the database
 * Requires a valid JWT token containing the username
 */
app.post('/api/collections/upload', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const user = req.user.username
  // Destructure the request body
  const { stac_version = null, stac_extensions = [], type = null, id = null, title = "", description = null, license = "", extent = null, summaries = {}, providers = [], keywords = [] } = req.body;

  try {
    //  Begin a transaction
    await db.query('BEGIN');

    // Insert the collection
    const insertCollectionQuery = {
      text: `
        INSERT INTO collections (stac_version, stac_extensions, type, id, title, description, license, extent, summaries, CREATION_USER, UPDATE_USER)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $10)
      `,
      values: [stac_version, stac_extensions, type, id, title, description, license, extent, summaries, user]
    }
    await db.query(insertCollectionQuery);

    // Insert the providers
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

    //  Insert the keywords
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

    // Commit the transaction
    await db.query('COMMIT');
    res.status(200).json({ message: 'Collection uploaded successfully' });
  } catch (error) {
    await db.query('ROLLBACK');
    res.status(500).json({ message: 'Internal server error' });
  }
})

/**
 * Endpoint to upload an item to the database
 * Requires a valid JWT token containing the username
 */
app.post('/api/items/upload', passport.authenticate('jwt', { session: false }), async (req, res) => {
  let error = "Exception while parsing input."
  const user = req.user.username;

  // Destructure the request body
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
    createNewCollection = false,
  } = req.body;
  // Destructure the properties
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
    // Begin a transaction
    await db.query('BEGIN');

    if (createNewCollection) {
      error = "Exception while creating new collection."
      const insertCollectionQuery = {
        text: `
        INSERT INTO collections (stac_version, id, description, extent, summaries, CREATION_USER, UPDATE_USER)
        VALUES ($1, $2, $2, $3, $4, $5, $5)
        `,
        values: [stac_version, collection, `{"spatial":{"bbox":[${bbox}]},"temporal":{"interval": [["1900-01-01T00:00:00Z","9999-12-31T23:59:59Z"]]}}`, "{}", user]
      }

      await db.query(insertCollectionQuery);
    }

    // Insert the item
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
        creation_user,
        update_user
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $9)
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
        user,
      ],
    };
    error = "Exception while inserting item."
    await db.query(insertItemsQuery);

    // Insert the properties
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
    error = "Exception while inserting properties."
    await db.query(insertPropertiesQuery);

    // Insert the tasks
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
      ON CONFLICT (collection, id, task) DO NOTHING
      `
      }

      error = "Exception while inserting tasks."
      for (const task of mlmTasks.split(',')) {
        await db.query(insertTasksQuery, [id, collection, task.trim(), user]);
      }
    }

    // Commit the transaction
    await db.query('COMMIT');
    res.status(200).json({ message: 'Item uploaded successfully' });
  } catch (error) {
    await db.query('ROLLBACK');
    res.status(500).json({ message: 'Internal server error: ' + error });
  }
});

// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

