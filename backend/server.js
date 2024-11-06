const http = require('http');
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

const server = http.createServer((req, res) => {

  //Testing pool connection
  pool.query('SELECT * FROM collections;', (err, results) => {
    if (err) {
      console.error(err);
      print("Nein")
      res.status(500).send('Internal Server Error');
    } else {
      res.send(results.rows);
      print("Ja")
    }
  });

});

server.listen(3000, () => {
  console.log('Server läuft auf Port 3000');
});