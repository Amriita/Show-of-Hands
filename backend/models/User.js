const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  UniqueId: String,
  email: String,
  Department: String,
  name: String,
  password: String
});

module.exports = mongoose.model("User", UserSchema);
