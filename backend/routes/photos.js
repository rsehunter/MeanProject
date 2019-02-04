const express = require("express");
const Photo = require('../models/photo');

const router = express.Router();

router.post("", (req, res, next) => {
  const photo = new Photo({
    caption: req.body.caption,
    location: req.body.location,
    url: req.body.url
  });
  photo.save().then(result => {
    res.status(201).json({
      message: 'Photo added successfully',
      photoId: result._id
    })
  })
})

router.delete("/:id", (req, res, next) => {
  Photo.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({
      message: req.params.id
    })
  })
});

router.put("/:photoId", (req, res, next) => {
  console.log(req.params.photoId);

  const photo = new Photo({
    _id: req.body.id,
    caption: req.body.caption,
    location: req.body.location,
    url: req.body.url
  });

  Photo.updateOne({ _id: req.params.photoId }, photo)
    .then((result) => {
      console.log(result);
      res.status(200).json({ message: "Update successful!" });
    }).catch((error) => {
      console.log(error);
    })
});

router.get("/:photoId", (req, res, next) => {
  console.log(req.params.photoId);
  Photo.findOne({ _id: req.params.photoId })
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    }).catch((error) => {
      console.log(error);
    })
});

router.get("", (req, res, next) => {
  Photo.find()
    .then((photos) => {
      console.log(photos);
      res.status(200).json({
        message: "Posts fetched successfully!",
        photos: photos
      });
    })
});

module.exports = router;
