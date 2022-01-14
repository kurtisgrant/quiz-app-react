// helper functions to do database queries to return data needed for the various routes

// just test to get all users
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

// just test to get one user
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

// get homepage data for logged in users
const getHomepage = function(db) {
  return db
    .query(`SELECT DISTINCT quizzes.*, count(questions.question) as questions,
                count(question_responses.selected_option_id) * 100 /
                (SELECT DISTINCT count(questions.question) FROM questions JOIN quizzes ON quizzes.id = questions.quiz_id JOIN quiz_attempts ON quizzes.id = quiz_attempts.quiz_id
                GROUP BY quiz_attempts.id LIMIT 1) as avg_score
            FROM quiz_attempts
            JOIN quizzes ON quizzes.id = quiz_attempts.quiz_id
            JOIN questions ON quizzes.id = questions.quiz_id
            JOIN question_options ON questions.id = question_id
            JOIN question_responses ON question_options.id = selected_option_id
            WHERE is_public = TRUE AND quiz_attempts.id = question_responses.quiz_attempt_id
            GROUP BY quizzes.id, quiz_attempts.id
            ;`)
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// get all quizzes owned by user
const getUserQuizzes = function(db, id) {
  return db
    .query(`SELECT quizzes.*, quizzes.when_created as time, count(quiz_attempts.id) as attempts
            FROM quizzes
            LEFT JOIN quiz_attempts ON quizzes.id = quiz_attempts.quiz_id
            WHERE owner_id = $1
            GROUP BY quizzes.id`,
      [id])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// get data for a specific quiz
const getQuiz = function(db, quizIdentifier) {
  return db
    .query(`SELECT quizzes.title, users.name as owner, quizzes.description, questions.question, question_options.*
            FROM quizzes
            JOIN questions ON quizzes.id = quiz_id
            JOIN question_options ON questions.id = question_id
            JOIN users ON quizzes.owner_id = users.id
            WHERE quiz_identifier = $1
            ORDER BY question_options.question_id;`,
      [quizIdentifier])
    .then((result) => {
      const optionsArr = result.rows;
      const quiz = {
        title: optionsArr[0].title,
        description: optionsArr[0].description,
        owner: optionsArr[0].owner,
        questions: []
      };

      let currentQuestion = { question_id: null };
      for (const option of optionsArr) {
        if (option.question_id !== currentQuestion.question_id) {
          currentQuestion = {
            question_id: option.question_id,
            question: option.question,
            options: [{ option_id: option.id, option: option.answer }]
          };
          if (currentQuestion.question_id) {
            quiz.questions.push(currentQuestion);
          }
        } else {
          currentQuestion.options.push({ option_id: option.id, option: option.answer });
        }
      };
      return quiz;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// get all quiz attempts for a specific user
const getAllQuizAttempts = function(db, testerId) {
  return db
    .query(`SELECT quiz_attempts.*, quizzes.title as quiz_title, quizzes.description as quiz_description, when_completed as time,
        (count(question_responses.selected_option_id) * 100 /
          (SELECT DISTINCT count(questions.question) FROM questions JOIN quizzes ON quizzes.id = questions.quiz_id JOIN quiz_attempts ON quizzes.id = quiz_attempts.quiz_id
                WHERE quiz_attempts.tester_id = $1 GROUP BY quiz_attempts.id LIMIT 1)) as score
            FROM quiz_attempts
            JOIN quizzes ON quizzes.id = quiz_attempts.quiz_id
            JOIN questions ON quizzes.id = questions.quiz_id
            JOIN question_options ON questions.id = question_id
            JOIN question_responses ON question_options.id = selected_option_id
            WHERE tester_id = $1 AND question_options.is_correct = TRUE
            GROUP BY quiz_attempts.id, quizzes.title, quizzes.description; `,
      [testerId])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// get a particular quiz attempt for a specific user
const getQuizAttempt = function(db, quizAttemptId) {
  return db
    .query(`SELECT quizzes.*, quiz_attempts.when_completed as attempt_timestamp, questions.*, question_options.*, question_options.id as option_id, question_responses.*, tester_id
            FROM quiz_attempts
            JOIN quizzes ON quizzes.id = quiz_attempts.quiz_id
            JOIN questions ON quizzes.id = questions.quiz_id
            JOIN question_options ON questions.id = question_id
            LEFT JOIN question_responses ON question_options.id = selected_option_id
            WHERE quiz_attempts.id = $1
            ORDER BY question_options.id, selected_option_id; `,
      [quizAttemptId])
    .then((result) => {
      console.log(result.rows);

      const data = result.rows;
      const attempt = {
        quiz_id: data[0].quiz_id,
        quiz_title: data[0].title,
        quiz_description: data[0].description,
        attempt_timestamp: data[0].attempt_timestamp,
        questions: []
      };

      let currentQuestion = { question_id: null };
      for (let option of data) {
        if (option.question_id !== currentQuestion.question_id) {
          currentQuestion = {
            question_id: option.question_id,
            question: option.question,
            options: [{ option_id: option.option_id, option: option.answer }],
            selected_option_id: option.selected_option_id
          };
          if (currentQuestion.question_id) {
            attempt.questions.push(currentQuestion);
          }
        } else {
          currentQuestion.options.push({ option_id: option.option_id, option: option.answer });
        }
      }

      for (option of data) {
        for (const question of attempt.questions) {
          if (question.question_id === option.question_id && option.is_correct === true) {
            question["correct_option_id"] = option.option_id;
          }
        }
      }

      for (option of data) {
        for (question of attempt.questions) {
          if (!question.selected_option_id && question.question_id === option.question_id) {
            question["selected_option_id"] = option.selected_option_id;
          }
        }
      };
      console.log(attempt);
      console.log(attempt.questions);
      console.log(attempt.questions[0].options);
      console.log(attempt.questions[1].options);
      console.log(attempt.questions[2].options);
      return attempt;

    })
    .catch((err) => {
      console.log(err.message);
    });
};

const insertQuiz = (db, ownerId, quizTitle, quizDescription, quizIdentifier, quizIsPublic) => {
  const quizQuery = 'INSERT INTO quizzes(owner_id, title, description, quiz_identifier, is_public) VALUES($1, $2, $3, $4, $5) RETURNING id; ';
  return db.query(quizQuery, [ownerId, quizTitle, quizDescription, quizIdentifier, quizIsPublic])
    .then(response => response.rows[0].id);
};

const insertQuestion = (db, ownerId, quizId, question) => {
  const questionQuery = 'INSERT INTO questions(owner_id, quiz_id, question) VALUES($1, $2, $3) RETURNING id; ';
  return db.query(questionQuery, [ownerId, quizId, question])
    .then(response => response.rows[0].id);
};

const insertOption = (db, questionId, answer, isCorrect) => {
  const optionQuery = 'INSERT INTO question_options(question_id, answer, is_correct) VALUES($1, $2, $3) RETURNING id; ';
  return db.query(optionQuery, [questionId, answer, isCorrect])
    .then(response => response.rows[0].id);
};

// add quiz to quiz database
const addQuiz = async (db, ownerId, quizIdentifier, quizData) => {
  const qz = quizData;

  const quiz_id = await insertQuiz(db, ownerId, qz.title, qz.description, quizIdentifier, qz.public);

  for (const q of qz.questions) {
    const question_id = await insertQuestion(db, ownerId, quiz_id, q.question);

    for (const op of q.options) {
      await insertOption(db, question_id, op[0], op[1]);
    }

  }
};

const insertQuizAttempt = (db, tester_id, quiz_id) => {
  const quizQuery = 'INSERT INTO quizzes(tester_id, quiz_id) VALUES($1, $2) RETURNING id; ';
  return db.query(quizQuery, [tester_id, quiz_id])
    .then(response => response.rows[0].id);
};

const insertQuestionResponse = (db, quiz_attempt_id, question_id, option_id) => {
  const quizQuery = 'INSERT INTO question_responses(quiz_attempt_id, question_id, selected_option_id) VALUES($1, $2, $3) RETURNING id; ';
  return db.query(quizQuery, [quiz_attempt_id, question_id, option_id])
    .then(response => response.rows[0].id);
};

// submit quiz and add info into database tables
const submitQuiz = async function(db, quizData) {
  const qz = quizData;

  const attempt_id = await insertQuizAttempt(db, qz.tester_id, qz.quiz_id);

  for (const selection of qz.selections) {
    await insertQuestionResponse(db, attempt_id, question_id, option_id);
  }
};

// generate random string to use as quiz_identifier for new quizzes created
const generateQuizIdentifier = () => {
  let random = "";
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < 7; i++) {
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
};;
