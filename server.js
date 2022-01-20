// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

app.use(morgan("dev"));
app.use(cors());

app.use(express.urlencoded({ extended: true }));

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


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
