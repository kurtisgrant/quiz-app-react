//helper functions to do database queries to return data needed for the various routes

//just test to get all users
const getUsers = function(db) {
  return db
    .query(`SELECT * FROM users;`)
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
    .query(`SELECT DISTINCT quiz_attempts.*, quizzes.title as quiz_title, quizzes.description as quiz_description
            FROM quiz_attempts
            JOIN quizzes ON quizzes.id = quiz_attempts.quiz_id
            JOIN questions ON quizzes.id = questions.quiz_id
            JOIN question_options ON questions.id = question_id
            JOIN question_responses ON question_options.id = selected_option_id
            WHERE tester_id = $1;`,
            [testerId])
    .then((result) => {
      console.log(result.rows);
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

//get a particular quiz attempt for a specific user
const getQuizAttempt = function(db, quizAttemptId) {
  return db
    .query(`SELECT DISTINCT quiz_attempts.*, quizzes.title as quiz_title, quizzes.description as quiz_description, count(question_responses) as score
            FROM quiz_attempts
            JOIN quizzes ON quizzes.id = quiz_attempts.quiz_id
            JOIN questions ON quizzes.id = questions.quiz_id
            JOIN question_options ON questions.id = question_id
            JOIN question_responses ON question_options.id = selected_option_id
            WHERE quiz_attempts.id = $1
            GROUP BY quiz_attempts.id, quizzes.title, quizzes.description;`,
            [quizAttemptId])
    .then((result) => {
      console.log(result.rows[0]);
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

//add quiz to quiz database
const addQuiz = function(db, something) {
  let queryParams = [something]
  let queryString = `INSERT INTO quizzes (owner_id, title, description, quiz_identifier, is_public)
                     VALUES ();
                     INSERT INTO questions (owner_id, quiz_id, question)
                     VALUES (), (), etc;
                     INSERT INTO question_options (question_id, answer, is_correct)
                     VALUES (), (), (), etc;`
  return db
    .query(queryString, queryParams)
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
}

//submit quiz and add info into database tables
const submitQuiz = function(db, something) {
  let queryParams = [something]
  let queryString = `INSERT INTO quizzes (owner_id, title, description, quiz_identifier, is_public)
                     VALUES ();
                     INSERT INTO questions (owner_id, quiz_id, question)
                     VALUES (), (), etc;
                     INSERT INTO question_options (question_id, answer, is_correct)
                     VALUES (), (), (), etc;`
  return db
    .query(queryString, queryParams)
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
}

// generate random string to use as quiz_identifier for new quizzes created
const generateQuizIdentifier = () => {
  let random = "";
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < 6; i++) {
    random += characters[Math.floor(Math.random() * characters.length)];
  }
  return random;
};

module.exports = {
  getUsers,
  getUserWithId,
  getHomepage,
  getUserQuizzes,
  getQuiz,
  getAllQuizAttempts,
  getQuizAttempt,
  addQuiz,
  submitQuiz,
  generateQuizIdentifier
}
