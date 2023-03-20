import { Request, Response, NextFunction } from "express"
import passport from "passport"
import { User, Code } from "models"
import { Sessions, Users } from "types"
import { generateCode } from "helpers"
import { sendCodeConfirmation } from "mail"

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
  next: NextFunction
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
          name: user.name,
          email: user.email,
        })
      })
    }
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
    birthheight,
    is_ft_heigth,
    body_type,
    physical_activities,
    weight,
    is_ft_weight,
  } = req.body

  try {
    /*   const user = await User.findOne({ email: login })

    if (user) {
      return res.status(422).json({ message: "User already exists" })
    } */

    let code = generateCode()

    const newCode: any = await Code.create({
      email: login,
      code,
    })

    if (!newCode) {
      return res.status(422).json({ message: "Code generation error" })
    }

    //send email with code here:
    //sendEmail(newCode.code)
    sendCodeConfirmation(newCode.code, newCode.email)

    await User.create({
      email: login,
      sex,
      birthheight,
      is_ft_heigth,
      body_type,
      physical_activities,
      weight,
      is_ft_weight,
    })

    return res.status(200).json({ message: "User registered" })
  } catch (error) {
    res.status(500).json({ message: "something went wrong..." })
  }
}
