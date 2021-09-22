const express = require("express");
const router = express.Router();
const Feedback = require("../Model/feedbackModal");


router.post("/add", async (req, res) => {
  const feedback = new Feedback({
    feedback: req.body.feedback,
    rating: req.body.rating,
    username:req.body.username,
    productid: req.body.productid
  });

  feedback
    .save()
    .then((result) => {
      res.status(200).json({
        message: "Feedback registered.",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Error sending feedback",
      });
    });
});

router.get("/get", (req, res) => {
  var returnData = [];
  Feedback.find()
    .populate("user")
    .populate("product")
    .then(function (data) {
      data.forEach((element) => {
        console.log(element.product.productname);
        returnData.push({
          id: element._id,
          fullname: element.user.fullname,
          feedback: element.feedback,
          rating: element.user.rating,
        });
      });
      res.send(returnData);
    });
});

router.get("/get/:productid", (req, res) => {
  productid = req.params.productid.toString();

  Feedback.find({ productid: productid })
    .then(function (data) {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Error displaying feedback",
      });
    });
});

module.exports = router;
