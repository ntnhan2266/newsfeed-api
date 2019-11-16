require("../db/connect");
const express = require("express");
const router = new express.Router();
const db = require("../db/connect");
const addSource = require("../db/helper");

router.get("/newsfeeds", async (req, res) => {
  try {
    let sql = `SELECT * FROM newsfeeds`;
    // Filter by author and source
    if (req.query.filterBy) {
      if (req.query.filterBy == "author" || req.query.filterBy == "source") {
        sql += ` WHERE ${req.query.filterBy} LIKE '%${
          req.query.filter ? req.query.filter : ""
        }%'`;
      }
    }

    // Sortby and order
    if (req.query.sortBy) {
      sql += ` ORDER BY ${req.query.sortBy}`;
    }
    if (req.query.order) {
      sql += ` ${req.query.order}`;
    }

    db.all(sql, [], (err, rows) => {
      if (err) {
        console.log(err);
        return res.send({ articles: [] });
      }
      return res.send({ articles: rows });
    });
  } catch (e) {
    console.log(e);
    return res.send({ articles: [] });
  }
});

router.get("/newsfeeds/sources", async (req, res) => {
  try {
    let sql = `SELECT DISTINCT sourceUrl FROM newsfeeds`;

    db.all(sql, [], (err, rows) => {
      if (err) {
        console.log(err);
        return res.send({ sources: [] });
      }
      return res.send({ sources: rows });
    });
  } catch (e) {
    console.log(e);
    return res.send({ sources: [] });
  }
});

router.post("/newsfeeds/add-source", async (req, res) => {
  try {
    const source = req.body.source;
    await addSource(db, source);
    return res.send({ completed: true });
  } catch (e) {
    console.log(e);
    return res.send({ completed: false });
  }
});

router.delete("/newsfeeds/source", async (req, res) => {
  try {
    const source = req.query.source;
    db.run(`DELETE FROM newsfeeds WHERE sourceUrl='${source}'`, [], function(
      err
    ) {
      if (err) {
        console.error(err.message);
        return res.send({ completed: false });
      }
      console.log(`Row(s) deleted ${this.changes}`);
      return res.send({ completed: true });
    });
  } catch (e) {
    console.log(e);
    return res.send({ completed: false });
  }
});

module.exports = router;
