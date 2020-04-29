const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../keys");
const db = require("../db");

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  db.findUser(user.googleid).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: "https://headcount-discount.herokuapp.com/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      db.createUser(profile.id, profile.displayName).then(user => {
        done(null, user);
      });
    }
  )
);
