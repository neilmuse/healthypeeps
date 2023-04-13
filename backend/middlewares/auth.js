const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const authMiddleware = (req, res, next) => {
  const authorizationToken = req.header("Authorization");

  if (!authorizationToken) {
    return res.status(401).json({ error: "No token, authorization denied." });
  }

  try {
    const verifiedToken = jwt.verify(authorizationToken, process.env.JWT_SECRET);
    req.user = verifiedToken.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token." });
  }
};

module.exports = authMiddleware;
