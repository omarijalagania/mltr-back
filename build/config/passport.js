"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));
var _models = require("../models");
var _passport = _interopRequireDefault(require("passport"));
var _passportGoogleOauth = require("passport-google-oauth20");
var _passportLocal = require("passport-local");
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_dotenv.default.config();
_passport.default.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, user);
  });
});
_passport.default.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});
_passport.default.use(new _passportLocal.Strategy({
  usernameField: "login",
  passwordField: "code"
}, async function (login, code, done) {
  try {
    const user = await _models.User.findOne({
      email: login
    });
    if (!user) {
      return done(null, false, {
        message: "User not found"
      });
    }
    const isMatch = await _bcryptjs.default.compare(code, user.code);
    if (!isMatch) {
      return done(null, false, {
        message: "Code is incorrect or expired"
      });
    }
    /* Set user status "active" after successfully logged in */
    await _models.User.findOneAndUpdate({
      email: login
    }, {
      status: "active"
    });
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));
_passport.default.use(new _passportGoogleOauth.Strategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://mltr-test.onrender.com/auth/google/callback",
  passReqToCallback: true
}, async (req, _accessToken, _refreshToken, profile, done) => {
  try {
    // Check if user already exists in MongoDB
    console.log(req);
    let existingUser = await _models.User.findOne({
      googleId: profile.id
    });
    if (existingUser) {
      // User already exists, update their information and return it
      existingUser = await _models.User.findOneAndUpdate({
        googleId: profile.id
      }, {
        googleId: profile.id,
        name: profile.displayName,
        email: profile._json.email,
        picture: profile._json.picture,
        sex: "Camel",
        birth: "1983/09/08",
        height: 112383,
        is_ft_heigth: true,
        body_type: "111",
        physical_activities: "11111123",
        weight: 100,
        is_ft_weight: true
      }, {
        new: true
      });

      // User already exists, return it
      done(null, existingUser);
    } else {
      // User doesn't exist, create a new user and save to MongoDB

      const newUser = await _models.User.create({
        googleId: profile.id,
        name: profile.displayName,
        email: profile._json.email,
        picture: profile._json.picture,
        sex: "yes",
        birth: "1983/09/08",
        height: 112383,
        is_ft_heigth: true,
        body_type: "111",
        physical_activities: "11111123",
        weight: 100,
        is_ft_weight: true
      });
      done(null, newUser);
    }
  } catch (error) {
    done(error, null);
  }
}));