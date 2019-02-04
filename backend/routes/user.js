const express = require("express");
const User = require("../models/user");
const router = express.Router();
const bcrypt = require('bcrypt');

router.post("/signup", (req, res, next) => {
  console.log("here");

  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save().then(res => {
        console.log(res);
        res.status(201).json({
          message: 'User created!',
        })
      })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    });
  });
})
  module.exports = router;
