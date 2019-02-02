const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, unique: true },
  name: String,
  password: String,
  slackID: String,
  googleID: String
}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;