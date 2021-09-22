const express = require("express");
const router = express.Router();
const Cart = require("../Model/cartModal");
const { request } = require("http");

router.post("/add", (req, res) => {
  console.log(req.body)

  const cart = new Cart({
    // user: req.body.userid,
    // product: req.body.productid,

    userid: req.body.userid,
    productid: req.body.productid,
    productname: req.body.productname,
    fullname: req.body.fullname,
    email: req.body.email,
    address: req.body.address,
    mobile: req.body.mobile,
    price: req.body.price,
    image: req.body.image
  });

  cart
    .save()
    .then((result) => {
      res.status(201).json({
        message: "cart successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Error making cart",
      });
    });
});

router.get("/get", (req, res) => {
  Cart.find()
    .then(function (data) {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error displaying cart history",
      });
    });
});

router.get("/get/:userid", (req, res) => {
  userid = req.params.userid.toString();
  Cart.find({ userid: userid })

    .then((data) => {

      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error displaying cart history",
      });
    });
});
router.delete("/delete/:id", (req, res) => {
  Cart.findOneAndRemove({
    _id: req.params.id.toString()
  })
    .then(() => {
      res.status(201).json({
        message: "cart removed",
      });
    })
    .catch(() => {
      res.status(500).json({
        message: "Error deleting cart",
      });
    });
});
module.exports = router;
