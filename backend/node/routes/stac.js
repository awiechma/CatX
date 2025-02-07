const express = require("express");
const passport = require("../passportConfig");
const db = require("../db");

const router = express.Router();

router.get("/conformance", async (req, res) => {
  const query = {
    text: `
      SELECT conformsTo AS "conformsTo"
      FROM catalog
    `,
  };
  db.query(query)
    .then(({ rows: conforms }) =>
      res.status(200).json(conforms.length > 0 ? conforms[0] : {})
    )
    .catch((error) => {
      console.error("Error during collection export", error);
      res.status(500).json({ message: "Internal server error" });
    });
});

router.get("", async (req, res) => {
  const query = {
    text: `
      SELECT *
      FROM catalog_complete_view
    `,
  };

  db.query(query)
    .then(({ rows: catalog }) =>
      res.status(200).json(catalog.length > 0 ? catalog[0] : {})
    )
    .catch((error) => {
      console.error("Error during collection export", error);
      res.status(500).json({ message: "Internal server error" });
    });
});

/**
 * Protected route to retrieve collections from the database
 * Requires a valid JWT token to access
 */

router.get("/collections", async (req, res) => {
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
      const sanitizedCollections = collections.map((collection) => {
        const { audit, ...rest } = collection;
        return rest;
      });
      res.status(200).json(sanitizedCollections);
    })
    .catch((error) => {
      console.error("Error during collection export", error);
      res.status(500).json({ message: "Internal server error" });
    });
});

/**
 * Protected route to retrieve just one collection from the database
 */
router.get("/collections/:cid", async (req, res) => {
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
      const sanitizedCollections = collections.map((collection) => {
        const { audit, ...rest } = collection;
        return rest;
      });
      res
        .status(200)
        .json(sanitizedCollections.length > 0 ? sanitizedCollections[0] : {});
    })
    .catch((error) => {
      console.error("Error during collection export", error);
      res.status(500).json({ message: "Internal server error" });
    });
});

/**
 * Endpoint to retrieve items of one collection from the database
 * Accepts optional limit and offset parameters in the request body for pagination
 */
router.get("/collections/:cid/items", async (req, res) => {
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
    values: [limit + 1, offset, collection_id],
  };

  let itemcol = {
    type: "FeatureCollection",
    features: [],
    links: [
      {
        rel: "self",
        href: `http://localhost:3000/stac/collections/${collection_id}/items?limit=${limit}&offset=${offset}`,
      },
    ],
    context: {
      page: offset / limit + 1,
      limit: limit,
    },
  };
  if (offset > 0) {
    itemcol.links.push({
      rel: "prev",
      href: `http://localhost:3000/stac/collections/${collection_id}/items?limit=${limit}&offset=${
        offset - limit < 0 ? 0 : offset - limit
      }`,
    });
  }
  db.query(query)
    .then(({ rows: items }) => {
      const sanitizedItems = items.map((item) => {
        const { audit, ...rest } = item;
        return rest;
      });
      if (sanitizedItems.length > limit) {
        itemcol.links.push({
          rel: "next",
          href: `http://localhost:3000/stac/collections/${collection_id}/items?limit=${limit}&offset=${
            offset + limit
          }`,
        });
        sanitizedItems.pop();
      }
      itemcol.context.returned = sanitizedItems.length;
      itemcol.features = sanitizedItems;
      res.status(200).json(itemcol);
    })
    .catch((error) => {
      console.error("Error during item export:", error);
      res.status(500).json({ message: "Internal server error" });
    });
});

/**
 * Endpoint to retrieve items of one collection from the database
 * Accepts optional limit and offset parameters in the request body for pagination
 */
router.get("/collections/:cid/items/:iid", async (req, res) => {
  const collection_id = req.params.cid;
  const item_id = req.params.iid;
  const query = {
    text: `
      SELECT * 
      FROM items_complete_view
      WHERE collection = $1
      AND id = $2
    `,
    values: [collection_id, item_id],
  };

  db.query(query)
    .then(({ rows: items }) => {
      const sanitizedItems = items.map((item) => {
        const { audit, ...rest } = item;
        return rest;
      });
      res.status(200).json(sanitizedItems.length > 0 ? sanitizedItems[0] : {});
    })
    .catch((error) => {
      console.error("Error during item export:", error);
      res.status(500).json({ message: "Internal server error" });
    });
});

module.exports = router;