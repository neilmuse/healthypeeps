const dotenv = require('dotenv').config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const USER_MODEL = require("../schemas/user");
const { Post, Review, Discussion, Recipe, Listing } = require("../schemas/post");

const { hashPassword, comparePassword } = require('../utilities/password-util');
const { validateFields } = require('../utilities/validation');

const cloudinary = require('cloudinary').v2;

const createToken = (user, secret, expiresIn) => {
  const { id, email } = user;
  return jwt.sign({ id, email }, secret, { expiresIn });
};

cloudinary.config({ 
  cloudinary_url: process.env.CLOUDINARY_URL
});

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

  getUserById: async (userId) => {
    try {
      const user = await User.findById(userId);
      if (user) {
        const name = user.firstName;
        return userName;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error retrieving user:', error);
      throw error;
    }
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

  getAllPostsByCategory: async (req, res) => {
    try {
      const category = req.query.category;
      switch(category) {
          case 'discussions':
            // Retrieve all posts that are discussions
            const discussions = await Discussion.find();
            res.json(discussions);
            break;
          case 'recipes':
            const recipes = await Listing.find();
            res.json(recipes);
            break;
          case 'reviews':
            const reviews = await Review.find();
            res.json(reviews);
            break;
          case 'listings':
            const listings = await Listing.find();
            res.json(listings);
            break;
          default:
            break;
      }
    } catch (err) {
      // If an error occurs, send an HTTP status 500 and the error message.
      res.status(500).json({ message: err.message });
    }
  },

  getAllPostsByCategoryLimited: async (req, res) => {
    try {
      const category = req.query.category;
      let Model;
      switch(category) {
          case 'discussions':
            Model = Discussion;
            break;
          case 'recipes':
            Model = Recipe;
            break;
          case 'reviews':
            Model = Review;
            break;
          case 'listings':
            Model = Listing;
            break;
          default:
            return res.status(400).json({ message: "Invalid category" });
      }
      
      const posts = await Model.find().sort({ createdAt: -1 }).limit(5);
      res.json(posts);
  
    } catch (err) {
      // If an error occurs, send an HTTP status 500 and the error message.
      res.status(500).json({ message: err.message });
    }
  },

  getSpecificPost: async (req, res) => {
    const postId = req.params.id;
    const category = req.params.category;
    let Model;
  
    switch(category) {
      case 'discussions':
        Model = Discussion;
        break;
      case 'reviews':
        Model = Review;
        break;
      case 'listings':
        Model = Listing;
        break;
      case 'recipes':
        Model = Recipe;
        break;
      default:
        return res.status(400).json({ message: "Invalid category" });
    }
  
    try {
      const post = await Model.findById(postId);
      if (post == null) {
        return res.status(404).json({ message: `Can't find post with category ${category} and id ${postId}` });
      }
      res.json(post);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  uploadImage: async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file received');
        }

        let imageUrl = null;

        // Upload file to Cloudinary
        await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
                if (error) {
                    console.error('Upload to Cloudinary failed:', error);
                    reject('Upload failed.');
                } else {
                    imageUrl = result.url; // Store the URL of the image
                    resolve('File uploaded successfully to Cloudinary.');
                }
            }).end(req.file.buffer);
        });

        // Send the URL back to the frontend
        return res.status(200).json({ message: 'File uploaded successfully to Cloudinary.', url: imageUrl });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error.');
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

  getSpecificReview: async (req, res) => {
    const userID = req.params.id;
    try {
      const review = await Review.findById(userID);
      if (review == null) {
        // If there's no review with that ID, return an error.
        return res.status(404).json({ message: "Can't find review" });
      }
      // If the review was found, return it.
      res.json(review);
    } catch (err) {
      // In case of an error, return an HTTP status 500 and the error message.
      return res.status(500).json({ message: err.message });
    }
  },

  getSpecificListing: async (req, res) => {
    const userID = req.params.id;
    try {
      const listing = await Listing.findById(userID);
      if (listing == null) {
        // If there's no listing with that ID, return an error.
        return res.status(404).json({ message: "Can't find listing" });
      }
      // If the listing was found, return it.
      res.json(listing);
    } catch (err) {
      // In case of an error, return an HTTP status 500 and the error message.
      return res.status(500).json({ message: err.message });
    }
  },

  getSpecificRecipe: async (req, res) => {
    const userID = req.params.id;
    try {
      const recipe = await Recipe.findById(userID);
      if (recipe == null) {
        // If there's no recipe with that ID, return an error.
        return res.status(404).json({ message: "Can't find recipe" });
      }
      // If the recipe was found, return it.
      res.json(recipe);
    } catch (err) {
      // In case of an error, return an HTTP status 500 and the error message.
      return res.status(500).json({ message: err.message });
    }
  },
  
}
