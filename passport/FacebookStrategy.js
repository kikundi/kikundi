require("dotenv").config();

const passport = require('passport');
const User = require('../models/User');
const FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
  clientID: `${process.env.FACEBOOKCLIENTID}`,
  clientSecret: `${process.env.FACEBOOKSECRETAPP}`,
  callbackURL: "http://localhost:3000/auth/facebook/callback"
},

function (accessToken, refreshToken, profile, done) {
      User.findOne({
        facebookId: profile.id
      })
        .then(user => {
          if (user) {
            return done(null, user);
          }

          const newUser = new User({
            username: profile.displayName,
            facebookId: profile.id
          });

          newUser.save().then(user => {
            done(null, newUser);
          });
        })
        .catch(error => {
          done(error);
        });
    }
  )
);

