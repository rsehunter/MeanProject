const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const posts = [
  {
    id: "fadf12421l",
    title: "First server-side post",
    content: "This is coming from the server"
  },
  {
    id: "ksajflaj132",
    title: "Second server-side post",
    content: "This is coming from the server!"
  }
];

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
  const newPost = req.body;
  posts.push(newPost)
  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.get("/api/photos", (req, res, next) => {
  res.status(200).json({
    message: "Posts fetched successfully!",
    photos: photos
  });
});

app.get("/api/posts", (req, res, next) => {
  res.status(200).json({
    message: "Posts fetched successfully!",
    posts: posts
  });
});

module.exports = app;
