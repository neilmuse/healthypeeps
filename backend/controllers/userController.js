const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const USER_MODEL = require("../schemas/user");

const { hashPassword, comparePassword } = require('../utilities/password-util');
const { validateFields } = require('../utilities/validation');

const createToken = (user, secret, expiresIn) => {
  const { id, email } = user;
  return jwt.sign({ id, email }, secret, { expiresIn });
};

module.exports = {
  signup: async (req, res) => {
    const { firstName, lastName, email, password, repeatPassword, phoneNumber, userType } = req.body;
  
    const validationError = validateFields(firstName, lastName, email, password, repeatPassword, phoneNumber);
  
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    try {
      const existingUser = await USER_MODEL.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await hashPassword(password);

      const newUser = new USER_MODEL({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phoneNumber,
        userType,
      });

      await newUser.save();

      res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  },

  login: async(req, res) => {
    console.log("INSIDE LOGIN");
    const { email, password } = req.body;

    try {
      const user = await USER_MODEL.findOne({ email });

      if(!user) {
        return res.status(400).json({ message: "User not found"});
      }

      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Incorrect password" });
      }

      const token = createToken(user, process.env.JWT_SECRET, "1h");
      const refreshToken = createToken(user, process.env.JWT_SECRET, "7d");
      // setUser(user);
      res.json({ user, token, refreshToken });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
  },

  refreshToken: async(req, res) => {
    const { refreshToken } = req.body;

    if (!refresh_token) {
      return res.status(401).json({ message: "No token provided" });
    }

    try {
      const payload = jwt.verify(refreshToken, process.env.JWT_SECRET);
      const user = await USER_MODEL.findById(payload.id);
  
      if (!USER_MODEL) {
        return res.status(400).json({ message: "User not found" });
      }
  
      const newToken = createToken(user, process.env.JWT_SECRET, "1h");
      const newRefreshToken = createToken(user, process.env.JWT_SECRET, "7d");
  
      res.json({ token: newToken, refreshToken: newRefreshToken });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
  },

  getUserData: async (req, res) => {
    res.json(req.user);
  }
}
