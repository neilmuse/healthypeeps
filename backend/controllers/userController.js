const dotenv = require('dotenv').config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');

const USER_MODEL = require("../schemas/user");
const COMMENT_MODEL = require("../schemas/comment");
const { Post, Review, Discussion, Recipe, Listing } = require("../schemas/post");

const { hashPassword, comparePassword } = require('../utilities/password-util');
const { validateFields } = require('../utilities/validation');

const cloudinary = require('cloudinary').v2;

const createToken = (user, secret, expiresIn) => {
  const { id, email } = user;
  return jwt.sign({ id, email }, secret, { expiresIn });
};

const models = {
  review: Review,
  discussion: Discussion,
  recipe: Recipe,
  listing: Listing,
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

  getUserById: async (req, res) => {
    const { userId } = req.params;
  
    try {
      const user = await USER_MODEL.findById(userId);
      
      if (user) {
        return res.status(200).json(user);
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error('Error retrieving user:', error);
      return res.status(500).json({ message: "Server error" });
    }
  },

  updateUserData: async(req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, phoneNumber } = req.body;

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
    if (!email.match(emailRegex)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    // Validate phone number format (assuming it's a Philippine number)
    const phoneNumberRegex = /^(09|\+639)\d{9}$/;
    if (!phoneNumber.match(phoneNumberRegex)) {
        return res.status(400).json({ message: 'Invalid phone number format' });
    }

    try {
        // Check if the email is already used by another user
        const existingUser = await USER_MODEL.findOne({ email: email });
        if (existingUser && String(existingUser._id) !== String(id)) {
            return res.status(400).json({ message: 'Email is already in use' });
        }

        const user = await USER_MODEL.findById(id);
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
            const recipes = await Recipe.find();
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

  getAllPostsTitleByCategory: async (req, res) => {
    try {
      const category = req.query.category;
  
      // Mapping to get the appropriate model based on category
      const categoryModelMapping = {
        discussions: Discussion,
        recipes: Recipe,
        reviews: Review,
        listings: Listing
      };
  
      // Get the appropriate model for the given category
      const Model = categoryModelMapping[category];
  
      // Validate category
      if (!Model) {
        return res.status(400).json({ message: 'Invalid category provided' });
      }
  
      // Fetch and sort data from the appropriate model
      const documents = await Model.find({}).sort({ title: 1 });
      const titles = documents.map(document => document.title);
  
      res.json(titles);
  
    } catch (err) {
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
      case 'discussion':
        Model = Discussion;
        break;
      case 'review':
        Model = Review;
        break;
      case 'listing':
        Model = Listing;
        break;
      case 'recipe':
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

  getSpecificPostById: async (req, res) => {
    const postId = req.params.id;
    
    const models = [Discussion, Review, Listing, Recipe];
  
    for (let Model of models) {
      try {
        const post = await Model.findById(postId);
        if (post != null) {
          return res.json(post);
        }
      } catch (err) {
        // Log the error but continue searching in other models
        console.error(err.message);
      }
    }
  
    // If the loop completes, that means the post was not found in any model
    return res.status(404).json({ message: `Can't find post with id ${postId}` });
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

  //COMMENT
  addComment: async (req, res) => {
    try {
        const { content, postId, authorId } = req.body;

        if (!content || !postId || !authorId) {
          return res.status(400).json({ message: "Missing required data" });
        }

        // Check if the comment already exists
        const existingComment = await COMMENT_MODEL.findOne({
            content,
            post: new mongoose.Types.ObjectId(postId),
            author: new mongoose.Types.ObjectId(authorId)
        });

        if (existingComment) {
            // Comment already exists, return a message
            return res.status(409).json({ message: "Comment already exists" });
        }

        // Create new comment
        const newComment = new COMMENT_MODEL({
            content,
            post: new mongoose.Types.ObjectId(postId),
            author: new mongoose.Types.ObjectId(authorId),
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        // Save the comment
        await newComment.save();

        res.status(201).json({ message: "Comment created successfully", comment: newComment });
    } catch (error) {
        res.status(500).json({ message: "Error adding comment", error: error.message });
    }
  },

  editComment: async (req, res) => {
    try {
      const { content } = req.body;
      if (!content || content.trim() === "") {
        return res.status(400).json({ message: 'Content cannot be empty' });
      }

      const comment = await COMMENT_MODEL.findById(req.params.id);

      // Check if comment exists
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }

      // Check if user is the author of the comment
      if (comment.author.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'You are not authorized to edit this comment' });
      }

      // Update the comment
      comment.content = content;
      comment.updatedAt = Date.now();
      await comment.save();

      res.json(comment);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  },

  deleteComment: async (req, res) => {
    const commentId = req.params.id;
    try {
        const comment = await COMMENT_MODEL.findById(commentId);

        // Check if comment exists
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Check if user is the author of the comment
        if (comment.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You are not authorized to delete this comment' });
        }

        // Delete the comment
        await COMMENT_MODEL.deleteOne({ _id: commentId });

        res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
  },

  getCommentsByPostId: async (req, res) => {
    try {
      const postId = req.params.id;
      const comments = await COMMENT_MODEL.find({ post: postId }).populate('author').exec();
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ message: 'Fetching comments failed.' });
    }
  },

  editPost: async (req, res) => {
    try {
      const postId = req.params.id;
      const updatedData = req.body;
  
      // Find the post first to determine its category
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      // Get the appropriate model based on the category
      const Model = models[post.category] || Post;
  
      // Update the post using the appropriate model
      const updatedPost = await Model.findByIdAndUpdate(postId, updatedData, { new: true });
  
      // Send the updated post as a response
      res.json(updatedPost);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
  },
  
  deletePost: async (req, res) => {
    const postId = req.params.id;
  
    try {
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      await COMMENT_MODEL.deleteMany({ post: postId });
      await Post.deleteOne({ _id: postId });
  
      res.json({ message: 'Post and associated comments deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting post', error });
    }
  },

  getUser: async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await USER_MODEL.findById(req.params.id);
      if (!user) {
        return res.status(404).send({ error: 'User not found' });
      }
      res.send(user);
    } catch (error) {
      res.status(500).send({ error: 'Server error' });
    }
  }

}
