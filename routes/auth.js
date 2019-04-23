const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

//telegram require
const decache = require('decache');
    decache('../lib/passport-telegram');
const TelegramStrategy = require('../lib/passport-telegram').Strategy;

router.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
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
  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass
    });

    newUser.save()
    .then(() => {
      res.redirect("/");
    })
    .catch(err => {
      res.render("auth/signup", { message: "Something went wrong" });
    })
  });
});

//telegram
router.get('/login/telegram', passport.authenticate('telegram'), function (req, res) {
  // The request will be redirected to telepass.me for authentication, so this
  // function won't be called.
  res.redirect('https://telepass.me');
});

// GET /login/telegram/callback
//   Use passport.authenticate() as route middleware to authenticate the request. If
//   authentication fails, the user will be redirected to the special page. Otherwise,
//   the primary route function function will be called, which, in this example, will 
//   redirect the user to the index page.
router.get('/login/telegram/callback',
  passport.authenticate('telegram', { failureRedirect: '/failed' }),
  function (req, res) {
    console.log(res);
      res.redirect('/');
  }
);



passport.use(
  new TelegramStrategy({
      clientID: process.env.TELEPASS_APPID,
      clientSecret: process.env.TELEPASS_SECRET,
      callbackURL: `http://localhost:${process.env.PORT}/login/telegram/callback`
  },
  function(accessToken, refreshToken, profile, done) {
      // asynchronous verification, for effect...
      process.nextTick(function () {

          // To keep the example simple, the user's Telegram profile is returned
          // to represent the logged-in user.  In a typical application, you would
          // want to associate the Telegram account with a user record in your
          // database, and return that user instead.
          return done(null, profile);
      });
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
