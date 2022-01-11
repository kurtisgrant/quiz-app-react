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

module.exports = {
  getUsers,
  getUserWithId,
  getHomepage,
  getUserQuizzes,
  getQuiz
}
