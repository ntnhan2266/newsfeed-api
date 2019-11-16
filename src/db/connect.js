const sqlite3 = require("sqlite3").verbose();
const addSource = require('./helper');

// open database in memory
let db = new sqlite3.Database(":memory:", err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the in-memory SQlite database.");
});

db.serialize(function() {
  db.run(`
    CREATE TABLE newsfeeds (
      soureId INTEGER, 
      source TEXT, 
      author TEXT, 
      title TEXT, 
      description TEXT, 
      url TEXT, 
      urlToImage TEXT, 
      publishedAt TEXT,
      content TEXT,
      sourceUrl TEXT
    );
  `);

    addSource(db, "http://www.mocky.io/v2/5dc01bc8310000b288be3e37");
});

module.exports = db;
