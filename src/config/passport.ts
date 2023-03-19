import dotenv from "dotenv"
dotenv.config()
import { User } from "models"
import passport from "passport"
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20"
import { Strategy as LocalStrategy } from "passport-local"

import bcrypt from "bcryptjs"

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, user)
  })
})

passport.deserializeUser(function (user: any, cb) {
  process.nextTick(function () {
    return cb(null, user)
  })
})

passport.use(
  new LocalStrategy(
    {
      usernameField: "login",
      passwordField: "password",
    },
    async function (login, password, done) {
      try {
        const user = await User.findOne({ email: login })

        if (!user) {
          return done(null, false, { message: "Incorrect login or password" })
        }
        const isMatch = await bcrypt.compare(password, user.password as any)

        if (!isMatch) {
          return done(null, false, { message: "Incorrect email or password" })
        }
        return done(null, {
          _id: user._id,
          email: user.email,
        })
      } catch (err) {
        return done(err)
      }
    },
  ),
)

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (
      _accessToken: string,
      _refreshToken: string,
      profile: Profile,
      done: (error: any, user?: any, info?: any) => void,
    ) => {
      try {
        // Check if user already exists in MongoDB
        const existingUser = await User.findOne({ googleId: profile.id })
        if (existingUser) {
          // User already exists, update their information and return it
          existingUser.email = profile._json.email
          const updatedUser = await existingUser.save()
          // User already exists, return it
          done(null, updatedUser)
        } else {
          // User doesn't exist, create a new user and save to MongoDB

          const newUser = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile._json.email,
            picture: profile._json.picture,
          })

          done(null, newUser)
        }
      } catch (error) {
        done(error, null)
      }
    },
  ),
)
