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
  successRedirect: "https://auth-react.onrender.com/dashboard",
  failureRedirect: "/login/failed",
})

let user: any
let session: any

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
          login: user.email,
          sex: user.sex,
          birth: user.birth,
          height: user.height,
          is_ft_heigth: user.is_ft_heigth,
          body_type: user.body_type,
          physical_activities: user.physical_activities,
          weight: user.weight,
          is_ft_weight: user.is_ft_weight,
          status: user.status,
        })
      })
    },
  )(req, res, next)
}

export const getUser = async (req: Request, res: Response) => {
  try {
    user = req.user
    session = req.session
    res.send(req.user)
  } catch (error: any) {
    console.error(`Error setting session data: ${error.message}`)
    res.status(500).send("Server error")
  }
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
    /* Delete verification code, 1 hour after user registered or updated */
    setInterval(async () => {
      // Execute the update operation
      user = await User.findOneAndUpdate(
        { email: login },
        {
          code: "",
        },
      )
    }, 600000)

    /* Delete user after one day after inactive status */
    setInterval(async () => {
      var query = { status: { $eq: "inactive" } }
      user = await User.deleteMany(query)
    }, 86400000)

    const salt = await bcrypt.genSalt(10)
    // generate hashed password with salt (password = entered password, from request body)
    const hashedCode = await bcrypt.hash(code, salt)

    if (user) {
      // User already exists, update user with new data
      user = await User.findOneAndUpdate(
        { email: login },
        {
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
          status: "inactive",
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
        status: "inactive",
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

export const deactivateAccount = async (req: Request, res: Response) => {
  const { login } = req.body
  let code = generateCode()

  try {
    let user = await User.findOne({ email: login })

    if (!user) {
      return res.status(422).json({ message: "user not found" })
    }

    if (user) {
      sendCodeConfirmation(code, login)
      user = await User.findOneAndUpdate(
        {
          email: login,
        },
        {
          deactivateCode: code,
        },
        {
          new: true,
        },
      )
      return res.status(200).json({ message: "deactivation code sended" })
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong..." })
  }
}

export const confirmDeactivationCode = async (req: Request, res: Response) => {
  const { login, code } = req.body

  try {
    let user = await User.findOne({ email: login })

    if (!user) {
      return res.status(422).json({ message: "user not found" })
    }

    if (user) {
      if (user.deactivateCode === code) {
        user = await User.findOneAndDelete({ email: login })
        return res.status(200).json({ message: "account deactivated" })
      }
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong..." })
  }
}
