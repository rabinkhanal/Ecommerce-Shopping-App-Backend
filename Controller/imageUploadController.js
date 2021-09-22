const express = require("express");
const multer = require("multer");
const path = require("path");
const uploadRouter = express.Router();

var image;
var ImageToSend;

var storage = multer.diskStorage({
  destination: "./assets/images",
  filename: function (req, file, callback) {
    const ext = path.extname(file.originalname);
    ImageToSend = file.fieldname + Date.now() + ext;
    image = ImageToSend;
    callback(null, ImageToSend);
  },
});

const imageFileFilter = (req, file, cb) => {
  if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error("You can upload only image files!"), false);
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: imageFileFilter,
});

uploadRouter.post("/image").post(upload.single("image"), (req, res) => {
  console.log("/upload: " + ImageToSend);
  res.end(JSON.stringify({
    image: ImageToSend

}, null, 3));
});

module.exports = uploadRouter;
