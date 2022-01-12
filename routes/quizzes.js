/*
 * All routes for quizzes are defined here
 * Since this file is loaded in server.js into quizzes,
 *   these routes are mounted onto /quizzes
 */

const express = require('express');
const { reset } = require('nodemon');
const { getUserQuizzes, getQuiz, addQuiz, generateQuizIdentifier } = require('../dbQueriesHelpers');
const router  = express.Router();

//export data from quizzes routes to be used by server.js
module.exports = (db) => {
  router.get("/", (req, res) => {
    const user = req.user;

    if (req.user) {
      const quizzes = [
        { quiz_identifier: 'biK50vH', title: 'Capital Cities of North America', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi magnam sit omnis repellat, sunt dolorum vitae quae modi, odio officiis libero cumque assumenda commodi ducimus.', avg_score: '67%', total_attempts: 10 },
        { quiz_identifier: 'hv38vnj', title: 'Harry Potter Quiz', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Gesunt dolorum vitae quae modi, odio officiis libero cumque assumenda commodi ducimus.', avg_score: '83%', total_attempts: 3 },
        { quiz_identifier: 'fibajio', title: 'Parts of a Cell', description: 'Lorem ipsum dolor sit amet consectetur. Nisi magnam sit omnis repellat, sunt dolorum vitae quae modi, odio officiis libero cumque assumenda commodi ducimus.', avg_score: '72%', total_attempts: 1000 }
      ];
      const templateVars = { user, quizzes };

      res.render("index", templateVars);
    } else {
      res.send("Please login to see your quizzes!");
    }

    // //testing function with hardcoding userId; remember to change using req.session!
    // const userId = 1;

    // getUserQuizzes(db, userId)
    //   .then((quizzes) => {
    //     res.json({ quizzes })
    //   })
    //   .catch((err) => {
    //     res
    //       .status(500)
    //       .json({ error: err.message} );
    //   });
  });

  router.get("/new", (req, res) => {
    const user = req.user;
    res.render("create_quiz", {user});
  });

  router.get("/:quiz_identifier", (req, res) => {
    const user = req.user;

    if (req.user) {
      const quiz = [{
        title: "bleh",
        description: "BLEHBLEHBLHE aoufege fejfow",
        questions: [
          {question_id: 66, text: "Helloooooo?", options: [{option_id: 90, option_text: "HI"}, {option_id: 91, option_text: "HALLO"}, {option_id: 92, option_text: "BYE!"}]},
          {question_id: 67, text: "Byeeeee?", options: [{option_id: 93, option_text: "HIII"}, {option_id: 94, option_text: "HALLOOOO"}, {option_id: 95, option_text: "BYEEEE!"}]},
          {question_id: 68, text: "HB?", options: [{option_id: 96, option_text: "H"}, {option_id: 97, option_text: "HA"}, {option_id: 98, option_text: "B!"}]}
        ]
      }];
      const templateVars = { user, quiz };
      res.render("", templateVars);

    } else {
      res.send("Please login to complete this quiz!");
    };
    // getQuiz(db, req.params.quiz_identifier)
    //   .then(quiz => {
    //     if (quiz.length > 0) {
    //       res.json({ quiz });
    //     } else {
    //       res.send("There is no quiz associated with this url. Please make sure you've typed in the address correctly.");
    //     }
    //   })
    //   .catch(err => {
    //     res
    //       .status(500)
    //       .json({ error: err.message });
    //   });
  });

  router.post("/", (req, res) => {
    const quizIdentifier = generateQuizIdentifier();
    addQuiz()
  });

  return router;
};
