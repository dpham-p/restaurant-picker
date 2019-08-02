const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

module.exports = () => {
  passport.serializeUser((user, cb) => cb(null, user));
  passport.deserializeUser((obj, cb) => cb(null, obj));

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_KEY,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: 'http://localhost:8080/facebook/callback'
      },
      (accessToken, refreshToken, profile, cb) => cb(null, profile)
    )
  );
};
