const express = require('express');
// const authMiddleware = require("../lib/auth_middleware");

 const router  = express.Router();
// const { Pool } = require("pg");
// const dbParams = require("../lib/db.js");
// const db = new Pool(dbParams);
// db.connect();

// router.use(authMiddleware(db));

module.exports = (db) => {
    router.post("/", (req, res) => {
    req.session = null;
    res.send("Logged out");
  });

  return router;
}