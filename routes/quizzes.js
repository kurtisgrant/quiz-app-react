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
    // const user = req.user;

    // if (req.user) {
    //   const quizzes = [
    //     { quiz_identifier: 'biK50vH', title: 'How are you?', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi magnam sit omnis repellat, sunt dolorum vitae quae modi, odio officiis libero cumque assumenda commodi ducimus.', avg_score: '67%', total_attempts: 10 },
    //     { quiz_identifier: 'hv38vnj', title: 'You are how?', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Gesunt dolorum vitae quae modi, odio officiis libero cumque assumenda commodi ducimus.', avg_score: '83%', total_attempts: 3 },
    //     { quiz_identifier: 'fibajio', title: 'Parts of a Cell', description: 'Lorem ipsum dolor sit amet consectetur. Nisi magnam sit omnis repellat, sunt dolorum vitae quae modi, odio officiis libero cumque assumenda commodi ducimus.', avg_score: '72%', total_attempts: 1000 }
    //   ];
    //   const templateVars = { user, quizzes };

    //   res.render("quizzes", templateVars);
    // } else {
    //   res.send("Please login to see your quizzes!");
    // }

    const user = req.user;

    if (user) {
      getUserQuizzes(db, user.id)
        .then((quizzes) => {
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

    if (user) {
      getQuiz(db, req.params.quiz_identifier)
        .then(quiz => {
          if (quiz.length > 0) {
            const templateVars = { user, quiz };
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
    addQuiz(db, userID, quizIdentifier, quiz).catch(err => console.log('ERROR', err));
  });

  return router;
};
