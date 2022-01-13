
// Auth middleware checks if session contains userID
// Queries database and appends user data to req if user logged in
const authMiddleware = (db) => {
  return (req, res, next) => {
    const userID = req.session.userID;
    if (req.session.userID) {
      db.query(`SELECT * FROM users WHERE id = $1`, [userID])
        .then(result => req.user = result.rows[0])
        .catch(err => console.log(err.message))
        .then(() => next());
    } else {
      req.user = undefined;
      next();
    }
  };
};
module.exports = authMiddleware;
