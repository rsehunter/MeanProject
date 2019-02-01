const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Post = require('./models/post');
const Photo = require('./models/photo');

const app = express();

//mongo.exe "mongodb+srv://louis:nteCj8v0yYN2uG7X@cluster0-7jxdb.mongodb.net/test?retryWrites=true"
mongoose.connect("mongodb+srv://louis:nteCj8v0yYN2uG7X@cluster0-7jxdb.mongodb.net/test?retryWrites=true")
  .then(()=>{
    console.log("connected to MongoDB!")
  })
  .catch(()=>{
    console.log("connection failed!")
  });

const photos = [];
for(var i = 1; i<15; i++){
  photos.push(i)

}

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
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(result =>{
    res.status(201).json({
      message: 'Post added successfully',
      postId: result._id
    });
  
  });

});

app.delete("/api/posts/:id", (req, res, next) => {

  Post.deleteOne({_id:req.params.id}).then(result =>{
    console.log(result);
  })

  res.status(200).json({
    message: req.params.id 
  })
});

app.get("/api/photos", (req, res, next) => {
  res.status(200).json({
    message: "Posts fetched successfully!",
    photos: photos
  });
});

app.get("/api/newphotos", (req, res, next) => {
  Photo.find()
    .then((photos)=>{
      console.log(photos);
      res.status(200).json({
        message: "Posts fetched successfully!",
        photos: photo
      });
    })
});


app.get("/api/posts", (req, res, next) => {
  Post.find()
    .then(docs=>{
      console.log(docs);
      res.status(200).json({
        message: "Posts fetched successfully!",
        posts: docs
      });
    
    });

});

module.exports = app;
