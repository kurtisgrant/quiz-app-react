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
          const templateVars = {user: req.user, attempts: allUserAttempts};
          res.render("attempts", templateVars);
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
    const user = req.user;

    if (req.user) {
      getQuizAttempt(db, req.params.id)
        .then((attempt) => {
          // if quiz taker is the same as the user logged in, render the specific quiz attempt, else prevent from seeing
          if (attempt[0].tester_id === user.id) {
            const templateVars = {user: req.user, attempts: attempt}
            res.render("attempts", templateVars);
          } else {
            res.send("blank");
          };
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

  router.post("/", (req, res) => {
    submitQuiz
  });

  return router;
};
