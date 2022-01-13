const express = require('express');
const router = express.Router();

module.exports = () => {
  router.get("/login/:id", (req, res) => {
    const userID = req.params.id;
    req.session.userID = userID;
    res.redirect('/');
  });
  router.get("/logout", (req, res) => {
    req.session = null;
    res.redirect('/');
  });
  return router;
};
