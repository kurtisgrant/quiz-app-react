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
    const userId = 2;

    getAllQuizAttempts(db, userId)
      .then((allUserAttempts) => {
        res.json({allUserAttempts});
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });



  return router;
};
