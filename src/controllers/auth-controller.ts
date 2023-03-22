import { Request, Response, NextFunction } from "express"
import passport from "passport"
import { User } from "models"
import { Sessions, Users } from "types"
import { generateCode } from "helpers"
import { sendCodeConfirmation } from "mail"
import bcrypt from "bcryptjs"

export const googleAuthMiddleware = passport.authenticate("google", {
  scope: ["profile", "email"],
})

export const googleFallbackMiddleware = passport.authenticate("google", {
  successRedirect: "http://localhost:3000/dashboard",
  failureRedirect: "/login/failed",
})

let user: Users | undefined
let session: Sessions

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  passport.authenticate(
    "local",
    function (err: string, user: Users, info: { message: string | undefined }) {
      if (err) {
        return next(err)
      }
      if (!user) {
        return res.status(401).json({ message: info.message })
      }
      req.logIn(user, function (err) {
        if (err) {
          return next(err)
        }
        return res.json({
          _id: user._id,
          email: user.email,
          sex: user.sex,
          birth: user.birth,
          height: user.height,
          is_ft_heigth: user.is_ft_heigth,
          body_type: user.body_type,
          physical_activities: user.physical_activities,
          weight: user.weight,
          is_ft_weight: user.is_ft_weight,
        })
      })
    },
  )(req, res, next)
}

export const getUser = (req: Request, res: Response) => {
  user = req.user
  session = req.session
  res.send(req.user)

  console.log(session)
}

export const logOut = (req: Request, res: Response, next: NextFunction) => {
  if (user) {
    req.logout((err) => {
      if (err) {
        return next(err)
      }
    })
    session.destroy((err: string) => {
      // Destroy the session
      if (err) {
        return next(err)
      }
      res.clearCookie("connect.sid") // Clear the session cookie
      res.status(200).send("Logged out successfully.")
    })
  }
}

export const userRegister = async (req: Request, res: Response) => {
  const {
    login,
    sex,
    birth,
    height,
    is_ft_heigth,
    body_type,
    physical_activities,
    weight,
    is_ft_weight,
  } = req.body

  try {
    let code = generateCode()
    let user: any
    user = await User.findOne({ email: login })
    setInterval(async () => {
      // Execute the update operation
      user = await User.findOneAndUpdate(
        { email: login },
        {
          code: "",
        },
      )
    }, 600000)

    const salt = await bcrypt.genSalt(10)
    // generate hashed password with salt (password = entered password, from request body)
    const hashedCode = await bcrypt.hash(code, salt)

    if (user) {
      // User already exists, update user with new data
      user = await User.findOneAndUpdate(
        { email: login },
        {
          code: hashedCode,
          sex,
          birth,
          height,
          is_ft_heigth,
          body_type,
          physical_activities,
          weight,
          is_ft_weight,
        },
        { new: true },
      )

      sendCodeConfirmation(code, user.email)
      return res.status(201).json({ message: "User Updated", user: user.email })
    } else {
      // User does not exist, create new user with provided data
      user = await User.create({
        email: login,
        code: hashedCode,
        sex,
        birth,
        height,
        is_ft_heigth,
        body_type,
        physical_activities,
        weight,
        is_ft_weight,
      })

      sendCodeConfirmation(code, login)
      return res
        .status(200)
        .json({ message: "User registered", user: user.email })
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong..." })
  }
}
