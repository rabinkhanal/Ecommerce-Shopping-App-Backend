const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const db = require("./System/db");
const morgan = require("morgan");
const multer = require('multer')
const path= require('path')

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/assets"));
app.use(express.static(__dirname + "/assets/images"));
app.use("/assets/images", express.static("assets/images"));

const fileUploadRoute = require("./Controller/imageUploadController");
const userRoute = require("./Controller/userController");
const productRoute = require("./Controller/productController");
const feedbackRoute = require("./Controller/feedbackController");
const cartRoute = require("./Controller/cartController");
const orderRoute = require("./Controller/orderController");
const newsRoute = require("./Controller/newsController");


var ImagefileName = '';
var storage = multer.diskStorage({
    destination: 'assets/images',
    filename: function (req, file, callback) {
        const extension = path.extname(file.originalname);
        ImagefileName = file.fieldname + Date.now() + extension;
        callback(null, ImagefileName);
    }
});

var imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error("You can upload only image files!"), false);
    }
    cb(null, true);
};
var upload = multer({
    storage: storage,
    fileFilter: imageFileFilter,
    limits: {
        fileSize: 1000000000
    }
});

app.post('/upload/user/image', upload.single('image'), function (req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        image: ImagefileName
    }, null, 3));
}
)

app.use("/upload", fileUploadRoute);
app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/feedback", feedbackRoute);
app.use("/cart", cartRoute);
app.use("/order", orderRoute);
app.use("/news", newsRoute);

module.exports = app;
