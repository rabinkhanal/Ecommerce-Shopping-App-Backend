const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullname: String,
  email: String,
  mobile: String,
  password: String,
  address: String,
  image: String
});

const User = mongoose.model("User", userSchema);
module.exports = User;
