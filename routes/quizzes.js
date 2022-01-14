/*
 * All routes for quizzes are defined here
 * Since this file is loaded in server.js into quizzes,
 *   these routes are mounted onto /quizzes
 */

const express = require('express');
const { reset } = require('nodemon');
const { getUserQuizzes, getQuiz, addQuiz, generateQuizIdentifier } = require('../lib/dbQueriesHelpers');
const router = express.Router();

// Export quiz routes to be used by server.js
module.exports = (db) => {
  router.get("/", (req, res) => {


    const user = req.user;

    if (user) {
      getUserQuizzes(db, user.id)
        .then((quizzes) => {
          for (i in quizzes) {
            const attemptTime = ((quizzes[i]["time"]).toString()).slice(0, 16);
            quizzes[i]["time"] = attemptTime;
          }
          const templateVars = { user, quizzes };
          res.render("quizzes", templateVars);
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });

    } else {
      res.send("Please login!");
    };

  });

  router.get("/new", (req, res) => {
    const user = req.user;
    res.render("create_quiz", { user });
  });

  router.get("/:quiz_identifier", (req, res) => {

    const user = req.user;
    const arr = [];

    if (user) {
      getQuiz(db, req.params.quiz_identifier)
        .then(quiz => {
          if (quiz) {
            const quizIdentifier = req.params.quiz_identifier;
            const questions = quiz.questions;
            for (question of quiz.questions) {
              for (option of question.options) {
                console.log(option[0]);
              }
            }
            console.log(arr);
            const templateVars = { user, quiz, quizIdentifier, questions };
            res.render("quiz", templateVars);
          } else {
            res.send("There is no quiz associated with this url. Please make sure you've typed in the address correctly.");
          }
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });

    } else {
      res.send("Please login to complete this quiz!");
    };
  });

  router.post("/", (req, res) => {
    const quiz = req.body;
    const userID = req.user.id;
    const quizIdentifier = generateQuizIdentifier();

    addQuiz(db, userID, quizIdentifier, quiz);

    res.status(200).json('I guess it worked!');
  });

  return router;
};
