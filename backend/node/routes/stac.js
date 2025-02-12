const express = require("express");
const passport = require("../passportConfig");
const db = require("../db");

const router = express.Router();

/*
* Stac Endpoint
*/
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

/*
* Stac Endpoint for retrieving the catalog
*/
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
  const limit = req.query.limit || 20;
  const offset = req.query.offset || 0;
  const query = {
    text: `
      SELECT *
      FROM collections_complete_view
      LIMIT $1
      OFFSET $2
    `,
    values: [limit, offset],
  };

  const countQuery = {
    text: `
      SELECT COUNT(*)
      FROM collections_complete_view
    `,
  };

  let returnedJson = {
    collections: [],
    links: [
      {
        rel: "self",
        href: `http://localhost:3000/stac/collections?limit=${limit}&offset=${offset}`,
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
      href: `http://localhost:3000/stac/collections?limit=${limit}&offset=${
        offset - limit > 0 ? 0 : offset - limit
      }`,
    });
  }

  db.query(query)
    .then(({ rows: collections }) => {
      if (collections.length > limit) {
        returnedJson.links.push({
          rel: "next",
          href: `http://localhost:3000/stac/collections?limit=${limit}&offset=${
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
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;
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

  const countQuery = {
    text: `
      SELECT COUNT(*)
      FROM items_complete_view
      WHERE collection = $1
    `,
    values: [collection_id],
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

  await db
    .query(countQuery)
    .then(({ rows: count }) => {
      itemcol.context.matched = parseInt(count[0].count);
    })
    .catch((error) => {
      console.error("Error during item export:", error);
      res.status(500).json({ message: "Internal server error" });
    });

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

const searchItems = async (queryParams, res) => {
  const {
    limit = 10,
    offset = 0,
    bbox,
    datetime,
    intersects,
    ids,
    collections,
  } = queryParams;

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

  if (bbox && intersects) {
    res.status(400).json({
      message: "Only one of 'bbox' or 'intersects' may be specified.",
    });
  }

  if (bbox) {
    const [minLon, minLat, maxLon, maxLat] = bbox;
    filters.push(
      `ST_Intersects(
        ST_GeomFromGeoJSON(geometry),
        ST_MakeEnvelope(
          $${queryValues.length + 1},
          $${queryValues.length + 2},
          $${queryValues.length + 3},
          $${queryValues.length + 4},
          4326
        )
      )`
    );
    queryValues.push(minLon, minLat, maxLon, maxLat);
  }

  if (intersects) {
    filters.push(
      `ST_Intersects(ST_GeomFromGeoJSON(geometry), ST_GeomFromGeoJSON($${
        queryValues.length + 1
      }))`
    );
    queryValues.push(intersects);
  }

  if (datetime) {
    if (datetime.includes("/")) {
      const [startTime, endTime] = datetime.split("/");

      if (startTime && startTime !== "..") {
        filters.push(
          `(properties->>'datetime')::TIMESTAMP >= $${queryValues.length + 1}`
        );
        queryValues.push(startTime);
      }

      if (endTime && endTime !== "..") {
        filters.push(
          `(properties->>'datetime')::TIMESTAMP <= $${queryValues.length + 1}`
        );
        queryValues.push(endTime);
      }
    } else {
      // Exact timestamp match
      filters.push(
        `(properties->>'datetime')::TIMESTAMP = $${queryValues.length + 1}`
      );
      queryValues.push(datetime);
    }
  }

  if (ids) {
    filters.push(`id = ANY($${queryValues.length + 1})`);
    queryValues.push(ids);
  }

  if (collections) {
    filters.push(`collection = ANY($${queryValues.length + 1})`);
    queryValues.push(collections);
  }

  if (queryValues.length > 0) {
    baseQuery += ` WHERE ${filters.join(" AND ")}`;
    countQuery += ` WHERE ${filters.join(" AND ")}`;
  }

  queryValues.push(limit + 1, offset);

  const finalQuery = {
    text: `${baseQuery} LIMIT $${queryValues.length - 1} OFFSET $${
      queryValues.length
    }`,
    values: queryValues,
  };

  let itemcol = {
    type: "FeatureCollection",
    features: [],
    links: [
      {
        rel: "self",
        href: `http://localhost:3000/stac/search?limit=${limit}&offset=${offset}${
          bbox ? `&bbox=${bbox}` : ""
        }${intersects ? `&intersects=${intersects}` : ""}${
          datetime ? `&datetime=${datetime}` : ""
        }${ids ? `&ids=${ids}` : ""}${
          collections ? `&collections=${collections}` : ""
        }`,
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
      href: `http://localhost:3000/api/search?limit=${limit}&offset=${
        offset - limit > 0 ? 0 : offset - limit
      }${bbox ? `&bbox=${bbox}` : ""}${
        intersects ? `&intersects=${intersects}` : ""
      }${datetime ? `&datetime=${datetime}` : ""}${ids ? `&ids=${ids}` : ""}${
        collections ? `&collections=${collections}` : ""
      }`,
    });
  }

  db.query(finalQuery)
    .then(({ rows: items }) => {
      if (items.length > limit) {
        itemcol.links.push({
          rel: "next",
          href: `http://localhost:3000/api/search?limit=${limit}&offset=${
            offset + limit
          }${bbox ? `&bbox=${bbox}` : ""}${
            intersects ? `&intersects=${intersects}` : ""
          }${datetime ? `&datetime=${datetime}` : ""}${
            ids ? `&ids=${ids}` : ""
          }${collections ? `&collections=${collections}` : ""}`,
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
};
router.get("/search", async (req, res) => {
  await searchItems(req.query, res);
});

router.post("/search", async (req, res) => {
  await searchItems(req.body, res);
});
module.exports = router;
