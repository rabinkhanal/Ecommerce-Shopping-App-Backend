const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({

  rating: Number,
  feedback: String,
  username: String,
  productid: String
}, {strict:false});

const Feedback = mongoose.model("Feedback", FeedbackSchema);
module.exports = Feedback;
