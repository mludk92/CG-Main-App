const pg = require('pg');
require('dotenv').config();

let pool;

// When our app is deployed to the internet 
// we'll use the DATABASE_URL environment variable
// to set the connection info: web address, username/password, db name
// eg: 
// DATABASE_URL=postgresql://jDoe354:secretPw123@some.db.com/prime_app
if (process.env.DATABASE_URL) {
  pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
}
// When we're running this app on our own computer
// we'll connect to the postgres database that is 
// also running on our computer (localhost)
else {
  const dbConfig = {
    host: 'localhost',
    port: 5432,
    database: 'changegrower'
  };

  // Check if username and password are present in the environment variables
  if (process.env.DB_USERNAME && process.env.DB_PASSWORD) {
    dbConfig.user = process.env.DB_USERNAME;
    dbConfig.password = process.env.DB_PASSWORD;
  }

  pool = new pg.Pool(dbConfig);
}

module.exports = pool;
