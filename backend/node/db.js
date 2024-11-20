// db.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('query', (query) => {
  console.log(query);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
