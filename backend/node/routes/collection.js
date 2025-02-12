const express = require("express");
const passport = require("../passportConfig");
const db = require("../db");

const router = express.Router();

/*
* Endpoint to get all collections from the database
*/
router.get("/collections", async (req, res) => {
  const limit = req.query.limit || 20;
  const offset = req.query.offset || 0;
  const query = {
    text: `
      SELECT 
        *
      FROM collections_complete_view
      LIMIT $1
      OFFSET $2
    `,
    values: [limit + 1, offset],
  };

  const countQuery = {
    text: `SELECT COUNT(*) FROM collections_complete_view`,
  };
  let returnedJson = {
    collections: [],
    links: [
      {
        rel: "self",
        href: `http://localhost:3000/api/collections?limit=${limit}&offset=${offset}`,
      },
    ],
    context: {
      page: offset / limit + 1,
      limit: limit,
    },
  };
  await db
    .query(countQuery)
    .then(({ rows: count }) => {
      returnedJson.context.matched = parseInt(count[0].count);
    })
    .catch((error) => {
      console.error("Error during collection export", error);
      res.status(500).json({ message: "Internal server error" });
    });

  if (offset > 0) {
    returnedJson.links.push({
      rel: "prev",
      href: `http://localhost:3000/api/collections?limit=${limit}&offset=${
        offset - limit > 0 ? 0 : offset - limit
      }`,
    });
  }

  db.query(query)
    .then(({ rows: collections }) => {
      if (collections.length > limit) {
        returnedJson.links.push({
          rel: "next",
          href: `http://localhost:3000/api/collections?limit=${limit}&offset=${
            offset + limit
          }`,
        });
        collections.pop();
      }
      returnedJson.context.returned = collections.length;
      returnedJson.collections = collections;
      res.status(200).json(returnedJson);
    })
    .catch((error) => {
      console.error("Error during collection export", error);
      res.status(500).json({ message: "Internal server error" });
    });
});

/*
* Endpoint to get a specific collection from the database by id
*/

router.get("/collections/:collectionid", async (req, res) => {
  const collectionId = req.params.collectionid;
  const query = {
    text: `
      SELECT * 
      FROM collections_complete_view
      WHERE id = $1
    `,
    values: [collectionId],
  };

  db.query(query)
    .then(({ rows: collections }) => {
      if (collections.length > 0) {
        res.status(200).json(collections[0]);
      } else {
        res.status(404).json({ message: "Collection not found" });
      }
    })
    .catch((error) => {
      console.error("Error during collection export:", error);
      res.status(500).json({ message: "Internal server error" });
    });
});

/**
 * Endpoint to upload a collection to the database
 * Requires a valid JWT token containing the username
 */
router.post(
  "/collections/upload",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let errorMessage = "";
    try {
      errorMessage = "Exception while parsing input.";
      const user = req.user.username;
      // Destructure the request body
      const {
        stac_version = null,
        stac_extensions = [],
        type = null,
        id = null,
        title = "",
        description = null,
        license = "",
        extent = null,
        item_assets = null,
        summaries = {},
        providers = [],
        keywords = [],
      } = req.body;

      //  Begin a transaction
      await db.query("BEGIN");

      // Insert the collection
      const insertCollectionQuery = {
        text: `
        INSERT INTO collections (stac_version, stac_extensions, type, id, title, description, license, extent, item_assets, summaries, CREATION_USER, UPDATE_USER)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $11)
      `,
        values: [
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
          user,
        ],
      };
      errorMessage = "Exception while inserting collection.";
      await db.query(insertCollectionQuery);

      // Insert the providers
      if (providers) {
        const insertProviderQuery = {
          text: `
        INSERT INTO providers (id, provider, CREATION_USER, UPDATE_USER)
        VALUES ($1, $2, $3, $3)
      `,
        };
        for (const provider of providers) {
          errorMessage = "Exception while inserting providers.";
          await db.query(insertProviderQuery, [id, provider, user]);
        }
      }

      //  Insert the keywords
      if (keywords) {
        const insertKeywordQuery = {
          text: `
        INSERT INTO keywords (id, keyword, CREATION_USER, UPDATE_USER)
        VALUES ($1, $2, $3, $3)
      `,
        };
        for (const keyword of keywords) {
          errorMessage = "Exception while inserting keywords.";
          await db.query(insertKeywordQuery, [id, keyword, user]);
        }
      }

      // Commit the transaction
      await db.query("COMMIT");
      res.status(200).json({ message: "Collection uploaded successfully" });
    } catch (error) {
      await db.query("ROLLBACK");
      res.status(500).json({
        message: "Internal server error: " + errorMessage,
        reason: `${error}`,
      });
    }
  }
);

module.exports = router;
