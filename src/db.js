const {Pool} = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  pool_mode: 'transaction',
  password: process.env.DB_PASSWORD
});

module.exports = pool;