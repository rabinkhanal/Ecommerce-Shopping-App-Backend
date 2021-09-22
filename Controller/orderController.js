const express = require("express");
const router = express.Router();
const Order = require("../Model/orderModal");

router.post("/add", (req, res) => {
  const order = new Order({
    userid: req.body.userid,
    productname: req.body.productname,
    price:req.body.price,
    image:req.body.image,
    payment: false,
  });
  console.log(order);
  order
    .save()
    .then((result) => {
      res.status(200).json({
        message: "order successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Error making order",
      });
    });
});

router.get("/get/:userid", (req, res) => {
  userid = req.params.userid.toString();
  Order.find({ userid: userid })
    .populate("product")
    .then((data) => {
      console.log(data)
    
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Error displaying order history",
      });
    });
});

router.put("/payment", (req, res) => {
  Order.findByIdAndUpdate(req.body.id, { payment: true }, { new: true }, () => {
    res.send("Payment made");
  });
});

router.delete("/delete/:orderid", (req, res) => {
  Order.findByIdAndDelete(req.params.orderid)
    .then(() => {
      res.status(201).json({
        message: "Order removed",
      });
    })
    .catch(() => {
      res.status(500).json({
        message: "Error deleting Order",
      });
    });
});

module.exports = router;
