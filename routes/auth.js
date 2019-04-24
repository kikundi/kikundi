const express = require("express");
const passport = require("passport");
require("../passport/FacebookStrategy.js");
const router = express.Router();
const User = require("../models/User");
const nodemailer = require("nodemailer");

const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/tribe",
  failureRedirect: "/auth/login",
  failureFlash: true,
  passReqToCallback: true
}));

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const phone = req.body.phone;
  const cardNumber = req.body.cardNumber;
  const cardName = req.body.cardName;
  const cardMonth = req.body.cardMonth;
  const cardYear = req.body.cardYear;
  const status = req.body.status;

  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let token = "";
    for (let i = 0; i < 25; i++) {
      token += characters[Math.floor(Math.random() * characters.length)];
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass,
      email,
      phone,
      cardNumber,
      cardName,
      cardMonth,
      cardYear,
      status
    });

    newUser.save()
      .then(() => {
        var transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: `${process.env.MAILFROM}`,
            pass: `${process.env.MAILPASS}`
          }
        })

        let host = req.get('host');
        let verificationLink = "http://" + req.get('host') + "/auth/confirm/" + token;

        transporter.sendMail({
          from: `${process.env.MAILFROM}`,
          to: email,
          subject: "Welcome to Kikundi!",
          text: "You'll never pay alone...",
          html: "Hello,<br> Please Click on the link to verify your email.<br><a href=" + verificationLink + ">Click here to verify</a>"
        })
        .then(info => console.log(info))
        .catch(error => console.log(error));
        res.redirect("/");
      })
      .catch(err => {
        res.render("auth/signup", {message: "Something went wrong" });
      })
  });
});

router.get("/auth/confirm/:confirmCode", (req, res) => {

  let confirmToken = req.params.confirmCode;
  let filterParam = { confirmationCode: { $eq: confirmToken } };
  User.findOne(filterParam).select({ status: 1 })
    .then((status) => {
      let idConfirmed = status._id;
  User.findByIdAndUpdate(idConfirmed, { status: "Active" })
    .then(() => {
      res.render("auth/login", { message: "Profile verified." });
      })
    })
    .catch(error => {
      res.redirect("/")
    });
});

router.get('/facebook',
  passport.authenticate('facebook'));

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/index');
  });

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
