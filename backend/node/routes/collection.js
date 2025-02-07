const express = require("express");
const passport = require("../passportConfig");
const db = require("../db");

const router = express.Router();

/**
 * Endpoint to retrieve providers from the database
 * Accepts optional limit and offset parameters in the request body for pagination
 */
router.get("/providers", (req, res) => {
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
  };
  db.query(query)
    .then(({ rows: providers }) => res.status(200).json(providers))
    .catch((error) => {
      console.error("Error during provider export", error);
      res.status(500).json({ message: "Internal server error" });
    });
});

/**
 * Endpoint to retrieve keywords from the database
 * Accepts optional limit and offset parameters in the request body for pagination
 */
router.get("/keywords", async (req, res) => {
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
  };
  db.query(query)
    .then(({ rows: keywords }) => res.status(200).json(keywords))
    .catch((error) => {
      console.error("Error during keyword export", error);
      res.status(500).json({ message: "Internal server error" });
    });
});

router.get("/collections", async (req, res) => {
  const limit = req.params.limit || 20;
  const offset = req.params.offset || 0;
  const query = {
    text: `
      SELECT 
        *
      FROM collections_complete_view
      LIMIT $1
      OFFSET $2
    `,
    values: [limit, offset],
  };
  db.query(query)
    .then(({ rows: collections }) => res.status(200).json(collections))
    .catch((error) => {
      console.error("Error during collection export", error);
      res.status(500).json({ message: "Internal server error" });
    });
});

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