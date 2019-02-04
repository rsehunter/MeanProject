const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


const app = express();
const photosRoutes = require("./routes/photos");
const userRoutes = require("./routes/user");

//mongo.exe "mongodb+srv://louis:nteCj8v0yYN2uG7X@cluster0-7jxdb.mongodb.net/test"
mongoose.connect("mongodb+srv://louis:nteCj8v0yYN2uG7X@cluster0-7jxdb.mongodb.net/test")
  .then(() => {
    console.log("connected to MongoDB!")
  })
  .catch(() => {
    console.log("connection failed!")
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST,PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/photos", photosRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
