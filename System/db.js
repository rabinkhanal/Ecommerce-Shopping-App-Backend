const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/bikEshoppingandroid", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.Promise = global.Promise;
console.log("Connected to Database server is established");
