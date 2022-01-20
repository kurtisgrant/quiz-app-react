/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const { getUsers, getUserWithId } = require('../lib/dbQueriesHelpers');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    getUsers(db)
      .then(users => {
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/:id", (req, res) => {
    getUserWithId(db, req.params.id)
      .then(data => {
        const user = data;
        res.json({ ...user });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
