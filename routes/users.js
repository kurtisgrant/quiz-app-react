/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/:id", (req, res) => {
    db.query(`SELECT users.*, quizzes.* FROM users LEFT JOIN quizzes ON users.id = owner_id WHERE users.id = $1;`, [req.params.id])
    .then(data => {
      const user = data.rows;
      res.json({ user });
    })
    .catch(err => {
      res
      .status(500)
      .json({ error: err.message });
    });
  });

  return router;
};
