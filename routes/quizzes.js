/*
 * All routes for quizzes are defined here
 * Since this file is loaded in server.js into quizzes,
 *   these routes are mounted onto /quizzes
 */

const express = require('express');
const { getUserQuizzes, getQuiz, addQuiz, generateQuizIdentifier } = require('../dbQueriesHelpers');
const router  = express.Router();

//export data from quizzes routes to be used by server.js
module.exports = (db) => {
  router.get("/", (req, res) => {
    //testing function with hardcoding userId; remember to change using req.session!
    const userId = 1;

    getUserQuizzes(db, userId)
      .then((quizzes) => {
        res.json({ quizzes })
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: err.message} );
      });
  });

  router.get("/new", (req, res) => {
    res.render("/new", bleh)
  });


  return router;
};
