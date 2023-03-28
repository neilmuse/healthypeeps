const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const POST_MODEL = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: {
    type: String,
    enum: ["discussion", "review", "food_listing", "recipe"],
    required: true,
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", POST_MODEL);
