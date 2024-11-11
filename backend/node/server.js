const express = require('express');
const { Pool } = require('pg');

// Create Pool instance
const pool = new Pool({
  user:'stac_user',
  password:'stac_password',
  database:'stac_db',
  host: 'localhost',
  port: 5432,
});

// Use pool to connect with DB
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client:', err);
  process.exit(-1);
});

const app = express();
const PORT = 3000;

// Starte den Server
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});