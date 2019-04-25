require("dotenv").config();

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const uploadCloud = require('../config/cloudinary.js');

router.get('/profile', (req, res, next) => {
  res.render('profile/profile');
});

router.get('/edit-profile', (req, res, next) => {
  res.render('profile/editProfile');
});

router.put('/edit-profile', uploadCloud.single('photo'), (req, res, next) => {
  const {name, password, picture} = req.body;

  User.findByIdAndUpdate(req.body.name, req.body.password, req.body.picture)
    .then(updateUser => res.redirect('/edit-profile'))
    .catch(() => res.redirect('/index'));
});

router.delete('/delete-profile', (req, res, next) => {
  User.findByIdAndDelete(req.body._id)
    .then(deletedUser => res.redirect('/signup'))
    .catch(() => res.redirect('/edit-profile'));
});

module.exports = router;
