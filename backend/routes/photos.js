const express = require("express");
const Photo = require('../models/photo');

const router = express.Router();
const checkAuth = require("../middleware/check-auth");

router.post("", checkAuth, (req, res, next) => {
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

router.delete("/:id", checkAuth, (req, res, next) => {
  Photo.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({
      message: 'Photo deleted!'
    })
  })
});

router.put("/:photoId", checkAuth, (req, res, next) => {
  console.log(req.params.photoId);

  const photo = new Photo({
    _id: req.body.id,
    caption: req.body.caption,
    location: req.body.location,
    url: req.body.url,
    liked: req.body.liked
  });

  Photo.updateOne({ _id: req.params.photoId }, photo)
    .then((result) => {
      console.log(result);
      res.status(200).json({ message: "Photo updated!" });
    }).catch((error) => {
      console.log(error);
    })
});

router.put("/liked/:photoId", checkAuth, (req, res, next) => {
  console.log(req.params.photoId);
  console.log(req.body);
  
  Photo.updateOne({ _id: req.params.photoId }, {$set:{'liked': req.body} })
    .then((result) => {
      console.log(result);
      res.status(200).json({ message: "Photo liked!" });

    }).catch((error) => {
      res.status(500).json({ message: "something wrong!" });
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
        message: "Photos fetched successfully!",
        photos: photos
      });
    })
});

module.exports = router;
