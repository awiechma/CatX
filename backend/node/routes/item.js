const express = require("express");
const passport = require("../passportConfig");
const db = require("../db");

const router = express.Router();

/*
* Endpoint to get all tasks from the database
*/
router.get("/mlmtasks", async (req, res) => {
  const limit = req.query.limit || 20;
  const offset = req.query.offset || 0;
  const query = {
    text: `
      SELECT 
        *
      FROM mlm_tasks_view
      LIMIT $1
      OFFSET $2
    `,
    values: [limit, offset],
  };
  db.query(query)
    .then(({ rows: mlmtasks }) => res.status(200).json(mlmtasks))
    .catch((error) => {
      console.error("Error during mlmtask export", error);
      res.status(500).json({ message: "Internal server error" });
    });
});

/*
* Endpoint to get the most recent items from the database
*/
router.get("/recent-items", async (req, res) => {
  try {
    const result = await db.query(`
          SELECT * FROM items_complete_view
          ORDER BY update_date DESC
          LIMIT 10
      `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * route to retrieve items from database
 * allows search via search=<searchTerm> in descripition or item id
 * allows search via tasks=<task1,task2,task3> in mlm:tasks
 */
router.get("/search", async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;
  const tasks = req.query.tasks || null;
  const searchTerm = req.query.search || null;

  let countQuery = `
    SELECT COUNT(*)
    FROM items_complete_view
  `;

  let baseQuery = `
    SELECT *
    FROM items_complete_view
  `;
  let queryValues = [];
  let filters = [];

  if (tasks) {
    filters.push(`properties->'mlm:tasks' @> $${filters.length + 1}`);
    queryValues.push(JSON.stringify(tasks.split(",")));
  }

  if (searchTerm) {
    filters.push(
      `(
        properties->>'description' ILIKE $${filters.length + 1}
        OR id ILIKE $${filters.length + 1}
        OR properties->>'mlm:name' ILIKE $${filters.length + 1}
      )`
    );
    queryValues.push(`%${searchTerm}%`);
  }

  if (filters.length > 0) {
    baseQuery += ` WHERE ${filters.join(" AND ")}`;
    countQuery += ` WHERE ${filters.join(" AND ")}`;
  }

  queryValues.push(limit + 1, offset);

  const finalQuery = {
    text: `${baseQuery} LIMIT $${filters.length + 1} OFFSET $${filters.length + 2
      }`,
    values: queryValues,
  };

  let itemcol = {
    type: "FeatureCollection",
    features: [],
    links: [
      {
        rel: "self",
        href: `http://localhost:3000/api/search?limit=${limit}&offset=${offset}${tasks ? `&tasks=${tasks}` : ""
          }${searchTerm ? `&search=${searchTerm}` : ""}`,
      },
    ],
    context: {
      page: offset / limit + 1,
      limit: limit,
    },
  };

  //get count of possible results
  await db
    .query(countQuery, queryValues.slice(0, -2))
    .then(({ rows: count }) => {
      itemcol.context.matched = parseInt(count[0].count);
    })
    .catch((error) => {
      console.error("Error during item export:", error);
      res.status(500).json({ message: "Internal server error" });
    });

  if (offset > 0) {
    itemcol.links.push({
      rel: "prev",
      href: `http://localhost:3000/api/search?limit=${limit}&offset=${offset - limit > 0 ? 0 : offset - limit
        }${tasks ? `&tasks=${tasks}` : ""}${searchTerm ? `&search=${searchTerm}` : ""
        }`,
    });
  }

  db.query(finalQuery)
    .then(({ rows: items }) => {
      if (items.length > limit) {
        itemcol.links.push({
          rel: "next",
          href: `http://localhost:3000/api/search?limit=${limit}&offset=${offset + limit
            }${tasks ? `&tasks=${tasks}` : ""}${searchTerm ? `&search=${searchTerm}` : ""
            }`,
        });
        items.pop();
      }
      itemcol.context.returned = items.length;
      itemcol.features = items;
      res.status(200).json(itemcol);
    })
    .catch((error) => {
      console.error("Error during item export:", error);
      res.status(500).json({ message: "Internal server error" });
    });
});


/**
 * Endpoint to retrieve a single item by its ID from the database
 */
router.get("/items/:itemid", async (req, res) => {
  const itemId = req.params.itemid;
  const query = {
    text: `
      SELECT * 
      FROM items_complete_view
      WHERE id = $1
    `,
    values: [itemId],
  };

  db.query(query)
    .then(({ rows: items }) => {
      if (items.length > 0) {
        res.status(200).json(items[0]);
      } else {
        res.status(404).json({ message: "Item not found" });
      }
    })
    .catch((error) => {
      console.error("Error during item export:", error);
      res.status(500).json({ message: "Internal server error" });
    });
});

/**
 * Endpoint to upload an item to the database
 * Requires a valid JWT token containing the username
 */
router.post(
  "/items/upload",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let errorMessage = "";
    try {
      errorMessage = "Exception while parsing input.";
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

      // Begin a transaction
      await db.query("BEGIN");

      const updateCollectionQuery = {
        text: `
            UPDATE collections
            SET 
              update_date = NOW(),
              update_user = $2,
              extent = jsonb_set(
                jsonb_set(
                  extent, 
                  '{spatial,bbox}', 
                  CASE
                    -- If spatial bbox is [0,0,0,0] or empty, replace it with new bbox values
                    WHEN (extent->'spatial'->'bbox'->0->>0 = '0' AND extent->'spatial'->'bbox'->0->>1 = '0'
                          AND extent->'spatial'->'bbox'->0->>2 = '0' AND extent->'spatial'->'bbox'->0->>3 = '0')
                    THEN to_jsonb(
                      ARRAY[ARRAY[
                        (CAST($3 AS jsonb)->0->>0)::numeric,  -- New minX
                        (CAST($3 AS jsonb)->0->>1)::numeric,  -- New minY
                        (CAST($3 AS jsonb)->0->>2)::numeric,  -- New maxX
                        (CAST($3 AS jsonb)->0->>3)::numeric   -- New maxY
                      ]]
                    )
                    -- Otherwise, extend bbox by comparing
                    ELSE to_jsonb(
                      ARRAY[ARRAY[
                        LEAST((extent->'spatial'->'bbox'->0->>0)::numeric, (CAST($3 AS jsonb)->0->>0)::numeric),
                        LEAST((extent->'spatial'->'bbox'->0->>1)::numeric, (CAST($3 AS jsonb)->0->>1)::numeric),
                        GREATEST((extent->'spatial'->'bbox'->0->>2)::numeric, (CAST($3 AS jsonb)->0->>2)::numeric),
                        GREATEST((extent->'spatial'->'bbox'->0->>3)::numeric, (CAST($3 AS jsonb)->0->>3)::numeric)
                      ]]
                    )
                  END
                ), 
                '{temporal,interval}', 
                CASE
                  -- If temporal interval is default (1970-01-01T00:00:00Z, 1970-01-01T00:00:00Z), replace it with new values
                  WHEN (extent->'temporal'->'interval'->0->>0 = '1970-01-01T00:00:00Z' AND extent->'temporal'->'interval'->0->>1 = '1970-01-01T00:00:00Z')
                  THEN to_jsonb(
                    ARRAY[ARRAY[
                      (CAST($4 AS jsonb)->0->>0)::timestamp,  -- New start date
                      (CAST($4 AS jsonb)->0->>1)::timestamp   -- New end date
                    ]]  
                  )
                  -- Otherwise, extend the temporal interval by comparing
                  ELSE to_jsonb(
                    ARRAY[ARRAY[
                      LEAST((extent->'temporal'->'interval'->0->>0)::timestamp, (CAST($4 AS jsonb)->0->>0)::timestamp),
                      GREATEST((extent->'temporal'->'interval'->0->>1)::timestamp, (CAST($4 AS jsonb)->0->>1)::timestamp)
                    ]]
                  )
                END
              )
            WHERE id = $1;
  
  
        `,
        values: [
          collection,
          user,
          JSON.stringify([bbox]),
          JSON.stringify([[start_datetime, end_datetime]]),
        ],
      };
      errorMessage = "Exception while updating collection.";
      await db.query(updateCollectionQuery);

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
      errorMessage = "Exception while inserting item.";
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
          user,
        ],
      };
      errorMessage = "Exception while inserting properties.";
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
        `,
        };

        errorMessage = "Exception while inserting tasks.";
        let newTasks = mlmTasks;
        if (!Array.isArray(mlmTasks)) {
          newTasks = newTasks.split(",");
        }
        for (const task of newTasks) {
          await db.query(insertTasksQuery, [id, collection, task.trim(), user]);
        }

      }

      // Commit the transaction
      await db.query("COMMIT");
      res.status(200).json({ message: "Item uploaded successfully" });
    } catch (error) {
      await db.query("ROLLBACK");
      res.status(500).json({
        message: `Internal server error: ${errorMessage}`,
        reason: `${error}`,
      });
    }
  }
);

module.exports = router;
