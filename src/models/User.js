const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  name: { type: String },
  profilePicture: { type: String },
  createdAt: { type: Date, default: Date.now },
},{ strict: false } );

module.exports = mongoose.model("User", userSchema);

