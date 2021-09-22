"use strict";
const express = require("express");
const router = express.Router();
const User = require("../Model/userModal");
const { ObjectId } = require('mongodb')


router.post("/register", (req, res) => {
  console.log(req.body);
  User.find({ email: req.body.email })
    .exec()
    .then((userData) => {
      if (userData.length >= 1) {
        res.status(200).json({ message: "Email already exists" });
      } else {
        const user = new User({
          fullname: req.body.fullname,
          email: req.body.email,
          mobile: req.body.mobile,
          password: req.body.password,
          address: req.body.address,
          image:""
        });

        user
          .save()
          .then((success) => {
            res.status(201).json({
              success: true,
            });
          })
          .catch((err) => {
            res.status(500).json({ success: false });
            console.log(err);
          });
      }
    });
});

router.post("/login", function (req, res) {
  var email = req.body.email;
  var password = req.body.password;


  User.findOne({ email: email, password: password })
    .then((result) => {
      if (result != null || result != "") {
        res.status(201).send(result);
      } else {
        res.status(500).json({
          message: "Invalid Login",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Invalid Login",
      });
    });
});

router.post("/update", (req, res) => {
  var fullname = req.body.fullname;
  var email = req.body.email;
  var mobile = req.body.mobile;
  var uid = req.body._id;
  var image = req.body.image
  var address= req.body.address

  console.log(req.body)

  User.findByIdAndUpdate({ _id: new ObjectId(uid) }, {
    $set: {
      fullname: fullname,
      email: email,
      mobile: mobile,
      address:address,
      image: image
    }
  }).then(() => {
    res.status(200).json({
      message: 'Updated'
    })
  }).catch(() => {
    res.status(500).json({
      message: 'Not updated'
    })
  })
});

module.exports = router;
