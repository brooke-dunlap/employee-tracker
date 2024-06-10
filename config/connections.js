const { Pool } = require('pg');
require('dotenv').config();

// Connect to database
const pool = new Pool(
    {
      // Enter PostgreSQL username
      user: process.env.DB_USER,
      // Enter PostgreSQL password
      password: process.env.DB_PASSWORD,
      host: 'localhost',
      database: 'company_db'
  },
  console.log('Connected to the company_db database!')
  )
  
  pool.connect();

  module.exports = pool;

