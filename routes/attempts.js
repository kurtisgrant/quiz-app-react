/*
 * All routes for quizzes are defined here
 * Since this file is loaded in server.js into attempts,
 *   these routes are mounted onto /attempts
 */
const express = require('express');
const { getAllQuizAttempts, getQuizAttempt, submitQuiz } = require('../lib/dbQueriesHelpers');
const router = express.Router();



// Export quiz attempt routes to be used by server.js
module.exports = (db) => {
  router.get("/", (req, res) => {
    // const user = req.user;

    // if (req.user) {
    //   const quizzes = [
    //     { id: 10, quiz_title: "Sandwiches Quiz", quiz_description: "A quiz about the best sandwiches", time: "2:45pm Dec 20, 2021", score: "80%" },
    //     { id: 20, quiz_title: "Pizza Quiz", quiz_description: "A quiz about the best pizzas", time: "3:00 am Oct 31, 2021", score: "67%" },
    //     { id: 30, quiz_title: "Burger Quiz", quiz_description: "A quiz about the best burgers", time: "2:15 pm Nov 10, 2021", score: "100%" }
    //   ];

    //   const templateVars = { user: user, attempts: quizzes };
    //   res.render("attempts", templateVars);
    // } else {
    //   res.send("Please login to see your quiz attempts!");
    // }

    const user = req.user;

    if (user) {
      getAllQuizAttempts(db, user.id)
        .then((allUserAttempts) => {
          for (i in allUserAttempts) {
            const attemptTime = ((allUserAttempts[i]["time"]).toString()).slice(0, 16);
            allUserAttempts[i]["time"] = attemptTime;
          }
          const templateVars = { user, attempts: allUserAttempts };
          res.render("attempts", templateVars);
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });

    } else {
      res.send("Please login to see your quiz attempts");
    };
  });

  router.get("/:id", (req, res) => {
    // const user = req.user;

    // if (req.user) {
    //   const attempt = {
    //     quiz_id: 20,
    //     quiz_title: "Pizza Quiz",
    //     quiz_description: "A quiz about the best pizzas",
    //     time: "3:00 am Oct 31, 2021",
    //     questions: [
    //       { question_id: 10, question_text: "Which pizza is this?", options: [{ option_id: 30, option_text: "Mushroom mush pizza!" }, { option_id: 31, option_text: "Pizza piz pizza!" }, { option_id: 32, option_text: "Bacon bawk pizza!" }], correct_option_id: 31, selected_option_id: 31 },
    //       { question_id: 11, question_text: "Which pizza is this?", options: [{ option_id: 33, option_text: "Tomato egg pizza!" }, { option_id: 34, option_text: "Hawaiian pizza!" }, { option_id: 35, option_text: "Nice pizza!" }], correct_option_id: 35, selected_option_id: 33 },
    //       { question_id: 12, question_text: "Which pizza is this?", options: [{ option_id: 36, option_text: "Bad pizza!" }, { option_id: 37, option_text: "Smile pizza!" }, { option_id: 38, option_text: "Bye bye pizza!" }], correct_option_id: 36, selected_option_id: 36 }
    //     ],
    //     score: "67%"
    //   };

    //   const templateVars = { user, attempt };
    //   res.render("attempt", templateVars);
    // } else {
    //   res.send("Please login to see your quiz attempts!");
    // }

    const user = req.user;
    const attemptId = req.params.id;

    getQuizAttempt(db, req.params.id)
      .then((attempt) => {
        let total = 0;
        for (const question of attempt.questions) {
          if (question.selected_option_id === question.correct_option_id) {
            total += 1;
          }
        }
        const score = Math.round((total * 100 / attempt.questions.length), 0);

        const templateVars = { user, attempt, attemptId, score };
        res.render("attempt", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/", (req, res) => {
    const quizData = req.body;
    const userID = req.user.id;

    const data = {
      tester_id: userID,
      quiz_id: quizData.quiz_id,
      selections: quizData.selections
    };

    submitQuiz(db, data);

    res.status(200).json('Quiz attempt recorded!');
  });

  return router;
};
