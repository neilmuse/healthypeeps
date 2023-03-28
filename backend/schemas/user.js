const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const USER_MODEL = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  userType: { type: String, enum: ["admin", "normal"], default: "normal" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", USER_MODEL);
