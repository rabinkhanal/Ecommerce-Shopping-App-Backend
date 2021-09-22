const mongoose = require("mongoose");
const { strict } = require("assert");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  userid: String,
  productname: String,
  fullname: String,
  email: String,
  address: String,
  mobile: String,
  image:String,
  price:Number,
  

}, {strict:false});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
