const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get('/profile', (req, res, next) => {
  res.render('profile/profile');
});

router.get('/edit-profile', (req, res, next) => {
  res.render('profile/editProfile');
});

module.exports = router;
