//helper functions to do database queries to return data needed for the various routes

//just test to get all users
const getUsers = function(db) {
  return db
    .query(`SELECT * FROM users`)
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

//just test to get one user
const getUserWithId = function(db, id) {
  return db
    .query(`SELECT * FROM users WHERE id = $1;`, [id])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

//get homepage data for logged in users
const getHomepage = function(db) {
  return db
    .query(`SELECT *
            FROM quizzes
            WHERE is_public = TRUE`)
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
}

//get all quizzes owned by user
const getUserQuizzes = function(db, id) {
  return db
    .query(`SELECT *
            FROM quizzes
            WHERE owner_id = $1`,
            [id])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

//get data for a specific quiz
const getQuiz = function(db, quizIdentifier) {
  return db
    .query(`SELECT quizzes.title, quizzes.description, questions.question, question_options.answer
            FROM quizzes
            JOIN questions ON quizzes.id = quiz_id
            JOIN question_options ON questions.id = question_id
            WHERE quiz_identifier = $1;`,
            [quizIdentifier])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

//get all quiz attempts for a specific user
const getAllQuizAttempts = function (db, testerId) {
  return db
    .query(`SELECT quiz_attempts.*
            FROM quiz_attempts
            WHERE tester_id = $1;`,
            [testerId])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

//get a particular quiz attempt for a specific user
const getQuizAttempt = function(db, quizAttemptId) {
  return db
    .query(`SELECT question_responses.selected_option_id as choice, question_options.answer
            FROM question_responses
            JOIN question_options ON question_options.id = selected_option_id
            WHERE quiz_attempt_id = $1;`,
            [quizAttemptId])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

//add quiz to quiz database
const addQuiz = function(db, something) {
  return db
    .query(`INSERT INTO quizzes (owner_id, title, description, quiz_identifier, is_public)
            VALUES ();
            INSERT INTO questions (owner_id, quiz_id, question)
            VALUES (), (), etc;
            INSERT INTO question_options (question_id, answer, is_correct)
            VALUES (), (), (), etc;`,
            [something])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
}

//submit quiz and add info into database tables
const submitQuiz = function(db, something) {
  return db
    .query(`INSERT INTO quizzes (owner_id, title, description, quiz_identifier, is_public)
            VALUES ();
            INSERT INTO questions (owner_id, quiz_id, question)
            VALUES (), (), etc;
            INSERT INTO question_options (question_id, answer, is_correct)
            VALUES (), (), (), etc;`,
            [something])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
}

module.exports = {
  getUsers,
  getUserWithId,
  getHomepage,
  getUserQuizzes,
  getQuiz,
  getAllQuizAttempts,
  getQuizAttempt,
  addQuiz,
  submitQuiz
}
