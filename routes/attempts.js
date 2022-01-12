/*
 * All routes for quizzes are defined here
 * Since this file is loaded in server.js into attempts,
 *   these routes are mounted onto /attempts
 */

const express = require('express');
const { getAllQuizAttempts, getQuizAttempt } = require('../dbQueriesHelpers');
const router  = express.Router();

//export data from quiz_responses routes to be used by server.js
module.exports = (db) => {
  router.get("/", (req, res) => {
    //testing with hardcoding userId without logging in
    //remember to replace with req.session info!
    const user = req.user;

    if (req.user) {
      getAllQuizAttempts(db, user.id)
        .then((allUserAttempts) => {
          res.json({allUserAttempts});
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });

    } else {
      res.send("Please login to see your quiz attempts");
    }
  });

  router.get("/:id", (req, res) => {
    getQuizAttempt(db, req.params.id)
      .then((attempt) => {
        res.json({attempt});
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
        });
  });

  router.post("/", (req, res) => {
    submitQuiz
  });

  return router;
};
