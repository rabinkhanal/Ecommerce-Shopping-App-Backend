const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  productname: String,
  price: Number,
  image: String,
  userid: String,
  payment: Boolean
}, { strict: false });

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
