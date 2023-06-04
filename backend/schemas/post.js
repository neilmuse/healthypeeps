const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const options = { discriminatorKey: 'category' };

const POST_MODEL = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: {
    type: String,
    enum: ["discussion", "review", "listing", "recipe"],
    required: true,
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, options);

const Post = mongoose.model("Post", POST_MODEL);

const Review = Post.discriminator(
  'review',
  new Schema({ 
    image: String
  }, options)
);

const Discussion = Post.discriminator(
  'discussion',
  new Schema({
    image: String
  }, options)
);

const Recipe = Post.discriminator(
  'recipe',
  new Schema({
    image: String,
    description: String,
    ingredients: [
      {
        name: String,
        unit: String,
        amount: Number,
      },
    ],
    preparation: [String],
    macros: {
      protein: Number,
      calories: Number,
      carbs: Number,
    },
    preparationTime: Number,
  }, options)
);

const Listing = Post.discriminator(
  'listing',
  new Schema({
    image: String,
    price: Number,
  }, options)
);

module.exports = { Post, Review, Discussion, Recipe, Listing };
