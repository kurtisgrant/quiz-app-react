-- sample users
INSERT INTO users (name, email, password) VALUES ('Hippo', 'hippo@cat.com', 'password');
INSERT INTO users (name, email, password) VALUES ('Flamingo', 'flamingo@cat.com', 'password');
INSERT INTO users (name, email, password) VALUES ('Ostrich', 'ostrich@cat.com', 'password');
INSERT INTO users (name, email, password) VALUES ('Bread', 'bread@cat.com', 'password');
INSERT INTO users (name, email, password) VALUES ('Tiger', 'tiger@cat.com', 'password');

-- sample quizzes
INSERT INTO quizzes (title, owner_id, description, quiz_identifier, is_public) VALUES ('Dog Quiz', 1, 'Quiz about different dogs', '123', TRUE);
INSERT INTO quizzes (title, owner_id, description, quiz_identifier, is_public) VALUES ('Bird Quiz', 1, 'Quiz about different birds', '234', TRUE);
INSERT INTO quizzes (title, owner_id, description, quiz_identifier, is_public) VALUES ('Pokemon Quiz', 1, 'Who dat Pokemon', '345', FALSE);
INSERT INTO quizzes (title, owner_id, description, quiz_identifier, is_public) VALUES ('Adjective Quiz', 3, 'Quiz about knowing adjectives', '456', TRUE);
INSERT INTO quizzes (title, owner_id, description, quiz_identifier, is_public) VALUES ('Happy Quiz', 4, 'Quiz asking if you are happy', '567', TRUE);

-- sample questions
INSERT INTO questions (owner_id, quiz_id, question) VALUES (1, 1, 'What dog is this?');
INSERT INTO questions (owner_id, quiz_id, question) VALUES (1, 1, 'How about this dog?');
INSERT INTO questions (owner_id, quiz_id, question) VALUES (1, 1, 'Which is not a dog?');
INSERT INTO questions (owner_id, quiz_id, question) VALUES (1, 2, 'What bird is this?');
INSERT INTO questions (owner_id, quiz_id, question) VALUES (1, 2, 'How about this bird?');
INSERT INTO questions (owner_id, quiz_id, question) VALUES (1, 2, 'Which is not a bird?');
INSERT INTO questions (owner_id, quiz_id, question) VALUES (1, 3, 'Guess the Pokemon?');
INSERT INTO questions (owner_id, quiz_id, question) VALUES (1, 3, 'Which Pokemon is this?');
INSERT INTO questions (owner_id, quiz_id, question) VALUES (1, 3, 'Which generation is this Pokemon from?');
INSERT INTO questions (owner_id, quiz_id, question) VALUES (3, 4, 'Which is an adjective?');
INSERT INTO questions (owner_id, quiz_id, question) VALUES (3, 4, 'Which is not an adjective?');
INSERT INTO questions (owner_id, quiz_id, question) VALUES (3, 4, 'Do you like adjectives?');
INSERT INTO questions (owner_id, quiz_id, question) VALUES (4, 5, 'Are you happy?');
INSERT INTO questions (owner_id, quiz_id, question) VALUES (4, 5, 'Are you sure?');

-- sample user quiz-attempts
INSERT INTO quiz_attempts (tester_id, quiz_id, completed) VALUES (2, 1, TRUE);
INSERT INTO quiz_attempts (tester_id, quiz_id, completed) VALUES (2, 3, TRUE);
INSERT INTO quiz_attempts (tester_id, quiz_id, completed) VALUES (3, 2, TRUE);
INSERT INTO quiz_attempts (tester_id, quiz_id, completed) VALUES (4, 4, TRUE);
INSERT INTO quiz_attempts (tester_id, quiz_id, completed) VALUES (5, 5, TRUE);
INSERT INTO quiz_attempts (tester_id, quiz_id, completed) VALUES (1, 1, TRUE);
INSERT INTO quiz_attempts (tester_id, quiz_id, completed) VALUES (1, 5, TRUE);

--sample question answer options for test quizzes
--quiz id 1 - dogs
INSERT INTO question_options (question_id, answer, is_correct) VALUES (1, 'Dog1', TRUE);
INSERT INTO question_options (question_id, answer, is_correct) VALUES (1, 'Dawg1', FALSE);
INSERT INTO question_options (question_id, answer, is_correct) VALUES (1, 'Doge1', FALSE);
INSERT INTO question_options (question_id, answer, is_correct) VALUES (2, 'Dog2', FALSE);
INSERT INTO question_options (question_id, answer, is_correct) VALUES (2, 'Dawg2', FALSE);
INSERT INTO question_options (question_id, answer, is_correct) VALUES (2, 'Doge2', TRUE);
INSERT INTO question_options (question_id, answer, is_correct) VALUES (3, 'Dog3', FALSE);
INSERT INTO question_options (question_id, answer, is_correct) VALUES (3, 'Dawg3', FALSE);
INSERT INTO question_options (question_id, answer, is_correct) VALUES (3, 'Doge3', TRUE);
-- quiz id 2 - birds
INSERT INTO question_options (question_id, answer, is_correct) VALUES (4, 'Bird1', TRUE);
INSERT INTO question_options (question_id, answer, is_correct) VALUES (4, 'Burd1', FALSE);
INSERT INTO question_options (question_id, answer, is_correct) VALUES (4, 'Birb1', FALSE);
INSERT INTO question_options (question_id, answer, is_correct) VALUES (5, 'Bird2', FALSE);
INSERT INTO question_options (question_id, answer, is_correct) VALUES (5, 'Burd2', TRUE);
INSERT INTO question_options (question_id, answer, is_correct) VALUES (5, 'Birb2', FALSE);
INSERT INTO question_options (question_id, answer, is_correct) VALUES (6, 'Bird3', FALSE);
INSERT INTO question_options (question_id, answer, is_correct) VALUES (6, 'Burd3', FALSE);
INSERT INTO question_options (question_id, answer, is_correct) VALUES (6, 'Birb3', TRUE);
-- quiz id 3 - Pokemon
INSERT INTO question_options (question_id, answer, is_correct) VALUES (7, 'Pikachu', FALSE);
INSERT INTO question_options (question_id, answer, is_correct) VALUES (7, 'Ditto', TRUE);
INSERT INTO question_options (question_id, answer, is_correct) VALUES (7, 'Squirtle', FALSE);
INSERT INTO question_options (question_id, answer, is_correct) VALUES (8, 'Donphan', FALSE);
INSERT INTO question_options (question_id, answer, is_correct) VALUES (8, 'Chansey', TRUE);
INSERT INTO question_options (question_id, answer, is_correct) VALUES (8, 'Teddiursa', FALSE);
INSERT INTO question_options (question_id, answer, is_correct) VALUES (9, 'Gen 1', FALSE);
INSERT INTO question_options (question_id, answer, is_correct) VALUES (9, 'Gen 2', FALSE);
INSERT INTO question_options (question_id, answer, is_correct) VALUES (9, 'Gen 3', TRUE);
-- quiz id 4 - adjectives
INSERT INTO question_options (question_id, answer, is_correct) VALUES (10, 'Jolly', TRUE);
INSERT INTO question_options (question_id, answer, is_correct) VALUES (10, 'Joy', FALSE);
INSERT INTO question_options (question_id, answer, is_correct) VALUES (10, 'Joyfully', FALSE);
INSERT INTO question_options (question_id, answer, is_correct) VALUES (11, 'Serendipitous', FALSE);
INSERT INTO question_options (question_id, answer, is_correct) VALUES (11, 'Supper', TRUE);
INSERT INTO question_options (question_id, answer, is_correct) VALUES (11, 'Superb', FALSE);
INSERT INTO question_options (question_id, answer, is_correct) VALUES (12, 'Yes', TRUE);
INSERT INTO question_options (question_id, answer, is_correct) VALUES (12, 'No', FALSE);
INSERT INTO question_options (question_id, answer, is_correct) VALUES (12, 'Dunno', FALSE);
-- quiz id 5 - happy
INSERT INTO question_options (question_id, answer, is_correct) VALUES (13, 'Yes', TRUE);
INSERT INTO question_options (question_id, answer, is_correct) VALUES (13, 'No', FALSE);
INSERT INTO question_options (question_id, answer, is_correct) VALUES (14, 'Yes', TRUE);
INSERT INTO question_options (question_id, answer, is_correct) VALUES (14, 'No', FALSE);

-- sample question responses from users
INSERT INTO question_responses (quiz_attempt_id, selected_option_id) VALUES (1, 1);
INSERT INTO question_responses (quiz_attempt_id, selected_option_id) VALUES (1, 4);
INSERT INTO question_responses (quiz_attempt_id, selected_option_id) VALUES (1, 7);
INSERT INTO question_responses (quiz_attempt_id, selected_option_id) VALUES (2, 20);
INSERT INTO question_responses (quiz_attempt_id, selected_option_id) VALUES (2, 22);
INSERT INTO question_responses (quiz_attempt_id, selected_option_id) VALUES (2, 25);
INSERT INTO question_responses (quiz_attempt_id, selected_option_id) VALUES (3, 10);
INSERT INTO question_responses (quiz_attempt_id, selected_option_id) VALUES (3, 13);
INSERT INTO question_responses (quiz_attempt_id, selected_option_id) VALUES (3, 16);
INSERT INTO question_responses (quiz_attempt_id, selected_option_id) VALUES (4, 28);
INSERT INTO question_responses (quiz_attempt_id, selected_option_id) VALUES (4, 31);
INSERT INTO question_responses (quiz_attempt_id, selected_option_id) VALUES (4, 34);
INSERT INTO question_responses (quiz_attempt_id, selected_option_id) VALUES (5, 37);
INSERT INTO question_responses (quiz_attempt_id, selected_option_id) VALUES (5, 39);
INSERT INTO question_responses (quiz_attempt_id, selected_option_id) VALUES (6, 2);
INSERT INTO question_responses (quiz_attempt_id, selected_option_id) VALUES (6, 5);
INSERT INTO question_responses (quiz_attempt_id, selected_option_id) VALUES (6, 8);
INSERT INTO question_responses (quiz_attempt_id, selected_option_id) VALUES (7, 38);
INSERT INTO question_responses (quiz_attempt_id, selected_option_id) VALUES (7, 40);
