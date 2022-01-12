 const express = require('express');
// const authMiddleware = require("../lib/auth_middleware");

 const router  = express.Router();
// const { Pool } = require("pg");
// const dbParams = require("../lib/db.js");
// const db = new Pool(dbParams);
// db.connect();

// router.use(authMiddleware(db));

module.exports = (db) => {
    router.get("/:id", (req, res) => {
    console.log('logging in... param: ', req.params.id);
    req.session.userID = req.params.id;
    res.redirect("/");
  });

  router.get("/:id", (req, res) => {
    console.log('logging in... param: ', req.params.id);
    req.session.userID = req.params.id;
    res.redirect("/");
  });
  return router;
}