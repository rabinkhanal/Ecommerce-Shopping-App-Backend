const express = require("express");
const router = express.Router();
const News = require("../Model/newsModal");

let dateob = new Date();
let date = ("0" + dateob.getDate()).slice(-2);
let month = ("0" + (dateob.getMonth() + 1)).slice(-2);
let year = dateob.getFullYear();
var currenttime = year + "-" + month + "-" + date;

router.post("/add", (req, res) => {
  console.log(req.body);
  const news = new News({
    heading: req.body.heading,
    description: req.body.description,
    date: currenttime,
  });

  news
    .save()
    .then((result) => {
      res.status(201).json({
        message: "news added successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Error adding news",
      });
    });
});

router.get("/get", (req, res) => {
  News.find()
    .then(function (data) {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error displaying news",
      });
    });
});

router.delete("/delete/:id", (req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then(() => {
      console.log("news removed");
      res.send(true);
    })
    .catch(() => {
      res.status(500).json({
        message: "Error deleting news",
      });
    });
});

module.exports = router;
