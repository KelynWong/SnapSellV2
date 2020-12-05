// Name: Wong En Ting Kelyn
// Admission no.: P1935800
// Class: DIT/1B/01

const jwt = require("jsonwebtoken");
const JWT_SECRET = "dumPotato";

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader === null || authHeader === undefined || !authHeader.startsWith("Bearer ")) {
    res.status(401).send();
    return;
  }
  const token = authHeader.replace("Bearer ", "");
  jwt.verify(token, JWT_SECRET, { algorithms: ["HS256"] }, (error, decodedToken) => {
    if (error) {
      res.status(401).send();
      return;
    }
    req.decodedToken = decodedToken;
    next();
  });
};