const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'data', 'database.db');

const db = new sqlite3.Database(DB_PATH, err => {
  if (err) {
    console.error(err.message);
    throw err;
  }
  console.log('Connected to the database.');
});

module.exports = db;