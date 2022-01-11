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

  router.get("/:quiz_identifier", (req, res) => {
    // node skeleton way of doing a database query - directly in router.get
    // db.query(`SELECT quizzes.title, quizzes.description, questions.question, question_options.answer
    //           FROM quizzes
    //           JOIN questions ON quizzes.id = quiz_id
    //           JOIN question_options ON questions.id = question_id
    //           WHERE quiz_identifier = $1;`,
    //           [req.params.quiz_identifier])
    getQuiz(db, req.params.quiz_identifier)
      .then(quiz => {
        if (quiz.length > 0) {
          res.json({ quiz });
        } else {
          res.send("There is no quiz associated with this url. Please make sure you've typed in the address correctly.");
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  return router;
};
