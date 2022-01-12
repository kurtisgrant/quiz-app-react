// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieSession = require("cookie-session");
const authMiddleware = require("./lib/auth_middleware");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.use(cookieSession({
  name: 'quiz-session',
  secret: process.env.SESSION_SECRET
}));

app.use(authMiddleware(db));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const quizzesRoutes = require("./routes/quizzes");
const attemptsRoutes = require("./routes/attempts");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/users", usersRoutes(db));
app.use("/quizzes", quizzesRoutes(db));
app.use("/attempts", attemptsRoutes(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {

  // Log for testing that userID & user data retrieved successfully
  console.log('userID from session storage: ', req.session.userID);
  console.log('user data from auth middleware: ', req.user);

  const quizzes = [
    { quiz_identifier: 'biK50vH', title: 'Capital Cities of North America', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi magnam sit omnis repellat, sunt dolorum vitae quae modi, odio officiis libero cumque assumenda commodi ducimus.', avg_score: '67%', questions: 25 },
    { quiz_identifier: 'hv38vnj', title: 'Harry Potter Quiz', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Gesunt dolorum vitae quae modi, odio officiis libero cumque assumenda commodi ducimus.', avg_score: '83%', questions: 12 },
    { quiz_identifier: 'fibajio', title: 'Parts of a Cell', description: 'Lorem ipsum dolor sit amet consectetur. Nisi magnam sit omnis repellat, sunt dolorum vitae quae modi, odio officiis libero cumque assumenda commodi ducimus.', avg_score: '72%', questions: 17 },
  ];

  res.render("index", { user: req.user, quizzes: quizzes });
});

// Login route for testing auth middleware
// Route to be moved out of server.js
app.get("/login/:id", (req, res) => {
  console.log('logging in... param: ', req.params.id);
  req.session.userID = req.params.id;
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
