// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

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
const widgetsRoutes = require("./routes/widgets");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {

  const user = undefined;
  const quizzes = [
    { quiz_identifier: 'biK50vH', title: 'Capital Cities of North America', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi magnam sit omnis repellat, sunt dolorum vitae quae modi, odio officiis libero cumque assumenda commodi ducimus.', avg_score: '67%', questions: 25 },
    { quiz_identifier: 'hv38vnj', title: 'Harry Potter Quiz', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Gesunt dolorum vitae quae modi, odio officiis libero cumque assumenda commodi ducimus.', avg_score: '83%', questions: 12 },
    { quiz_identifier: 'fibajio', title: 'Parts of a Cell', description: 'Lorem ipsum dolor sit amet consectetur. Nisi magnam sit omnis repellat, sunt dolorum vitae quae modi, odio officiis libero cumque assumenda commodi ducimus.', avg_score: '72%', questions: 17 },
  ];

  res.render("index", { user: user, quizzes: quizzes });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
