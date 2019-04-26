require("dotenv").config();

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const uploadCloud = require('../config/cloudinary.js');
const multer = require("multer");

router.get('/profile', (req, res, next) => {
  User.findById(req.user.id)
    .then((userData) => {
      const userInfo = {
        name: userData.username,
        email: userData.email,
        picture: userData.picture,
        phone: userData.phone,
      };
      res.render('profile/profile', { userInfo });
    })
    .catch(error => res.render('/login'))
});

router.get('/edit-profile', (req, res, next) => {
  const userInfo = req.user
    res.render('profile/editProfile', {userInfo});
});

router.post('/edit', uploadCloud.single('picture'), (req, res, next) => {
  const {username, email, phone, cardNumber, cardName, cardMonth, cardYear} = req.body
  User.findByIdAndUpdate(req.user.id, { $set: {
    username, 
    email, 
    phone, 
    cardNumber,
    cardName,
    cardMonth,
    cardYear
    }}, {new:true}
    )
    .then((userInfo) => {
      res.redirect("profile/profile", {userInfo});
    })
    .catch(error => res.render('/login')
    )
});

router.delete('/delete-profile', (req, res, next) => {
  User.findByIdAndDelete(req.body._id)
    .then(deletedUser => res.redirect('/signup'))
    .catch(() => res.redirect('/edit-profile'));
});

module.exports = router;
