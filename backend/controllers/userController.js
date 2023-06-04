const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const USER_MODEL = require("../schemas/user");
const { Post, Review, Discussion, Recipe, Listing } = require("../schemas/post");

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
      res.json({ user, token, refreshToken });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
  },

  refreshToken: async(req, res) => {
    try {
      // If user authenticated then generate new tokens
      const newToken = createToken(req.user, process.env.JWT_SECRET, "1h");
      const newRefreshToken = createToken(req.user, process.env.JWT_SECRET, "7d");
  
      res.json({ token: newToken, refreshToken: newRefreshToken });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getUserData: async (req, res) => {
    res.json(req.user);
  },

  updateUserData: async(req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, phoneNumber } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.phoneNumber = phoneNumber;

        await user.save();

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
  },

  addPost: async(req, res) => {
    try {
      let post;
      const { category, title, content, author } = req.body;
      
      // Check if Post already exists
      const existingPost = await Post.findOne({ title, content, author });

      if (existingPost) {
        res.status(400).json({ message: 'A post with the same title, content, and author already exists' });
        return;
      }
  
      switch (category) {
        case 'review':
          post = new Review(req.body);
          break;
        case 'discussion':
          post = new Discussion(req.body);
          break;
        case 'recipe':
          post = new Recipe(req.body);
          break;
        case 'listing':
          post = new Listing(req.body);
          break;
        default:
          res.status(400).json({ message: 'Invalid category' });
          return;
      }
      
      const savedPost = await post.save();
      res.json(savedPost);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAllDiscussions: async (req, res) => {
    try {
      // Retrieve all posts that are discussions
      const discussions = await Discussion.find();
      res.json(discussions);
    } catch (err) {
      // If an error occurs, send an HTTP status 500 and the error message.
      res.status(500).json({ message: err.message });
    }
  },

  getSpecificDiscussion: async (req, res) => {
    const userID = req.params.id;
    try {
      const discussion = await Discussion.findById(userID);
      if (discussion == null) {
        // If there's no discussion with that ID, return an error.
        return res.status(404).json({ message: "Can't find discussion" });
      }
      // If the discussion was found, return it.
      res.json(discussion);
    } catch (err) {
      // In case of an error, return an HTTP status 500 and the error message.
      return res.status(500).json({ message: err.message });
    }
  },
  
}
