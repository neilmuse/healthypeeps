const jwt = require('jsonwebtoken');
const USER_MODEL = require('../schemas/user');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401); // if there isn't any token

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await USER_MODEL.findById(payload.id);
    
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    next(err); // Pass the error to error handling middleware
  }
};

module.exports = authMiddleware;
