import dotenv from "dotenv"
dotenv.config()
import { User } from "models"
import passport from "passport"
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20"
import { Strategy as LocalStrategy } from "passport-local"

import bcrypt from "bcryptjs"

passport.use(
  new LocalStrategy(
    {
      usernameField: "login",
      passwordField: "code",
      passReqToCallback: true,
    },
    async function (_req, login, code, done) {
      try {
        const user = await User.findOne({ email: login })

        if (!user) {
          return done(null, false, { message: "User not found" })
        }

        if (!code) {
          return done(null, user)
        }

        const isMatch = await bcrypt.compare(code, user.code as any)

        if (!isMatch) {
          return done(null, false, { message: "Code is incorrect or expired" })
        }
        /* Set user status "active" after successfully logged in */
        await User.findOneAndUpdate(
          { email: login },
          {
            status: "active",
          },
        )
        return done(null, user)
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
      callbackURL: "https://mltr-test.onrender.com/auth/google/callback",
      passReqToCallback: true,
    },
    async (
      req: any,
      _accessToken: string,
      _refreshToken: string,
      profile: Profile,
      done: (error: any, user?: any, info?: any) => void,
    ) => {
      try {
        // Check if user already exists in MongoDB

        let existingUser = await User.findOne({ googleId: profile.id })
        if (existingUser) {
          // User already exists, update their information and return it
          existingUser = await User.findOneAndUpdate(
            { googleId: profile.id },
            {
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
              is_ft_weight: true,
            },
            {
              new: true,
            },
          )
          // User already exists, return it
          done(null, existingUser)
        } else {
          // User doesn't exist, create a new user and save to MongoDB

          const newUser = await User.create({
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
            is_ft_weight: true,
          })

          done(null, newUser)
        }
      } catch (error) {
        done(error, null)
      }
    },
  ),
)

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
