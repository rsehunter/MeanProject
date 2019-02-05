const express = require("express");
const User = require("../models/user");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
router.post("/signup", (req, res, next) => {

  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(result => {
          console.log(result);
          res.status(201).json({
            message: 'User created!',
          })
        })
        .catch(err => {
          if (err.errors && err.errors.email && err.errors.email.message 
            && err.errors.email.message === "email must be unique!!!") {
            console.log(err.errors.email);
            return res.status(201).json({
              message: err.errors.email.message
            })
          }
          res.status(500).json({
            error: err
          })
        });
    });
})

router.post("/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Email not found!"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        res.status(401).json({
          message: "Password did not match!"

        })
      }

      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        'secret_this_should_be_longer',
        { expiresIn: "1h" }
      );
      res.status(201).json({
        token: token,
        message: 'User logged in!',
      })
    })
    .catch(err => {
      console.log(err)
      res.status(401).json({
        message: "Auth failed!"

      })
    });
});

module.exports = router;
