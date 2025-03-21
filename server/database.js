const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');

// Connect to SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Error connecting to SQLite:', err);
  } else {
    console.log('✅ Connected to SQLite database');
  }
});

// 🟢 Ensure table exists with the correct columns
db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS pickup_requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      location TEXT NULL,
      address TEXT NOT NULL,
      district TEXT NOT NULL,
      city TEXT NOT NULL
    )`,
    (err) => {
      if (err) {
        console.error('❌ Error creating table:', err);
      } else {
        console.log('✅ Table pickup_requests is ready');
      }
    }
  );
});

module.exports = db;