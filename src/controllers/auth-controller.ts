import { Request, Response } from "express"
import { User } from "models"
import { generateCode } from "helpers"
import { sendCodeConfirmation } from "mail"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const loginWithoutCodeGoogle = async (req: Request, res: Response) => {
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
    let user = await User.findOne({ email: login })

    if (user) {
      // User already exists, update user with new data
      user = await User.findOneAndUpdate(
        { email: login },
        {
          email: login,
          sex,
          birth,
          height,
          is_ft_heigth,
          body_type,
          physical_activities,
          weight,
          is_ft_weight,
        },
        { new: true }
      )

      const token = jwt.sign(
        { _id: user?._id, name: user?.email },
        process.env.JWT_SECRET
      )

      return res
        .status(201)
        .json({ message: "User Updated and logged in.", token })
    } else {
      user = await User.create({
        email: login,
        sex,
        birth,
        height,
        is_ft_heigth,
        body_type,
        physical_activities,
        weight,
        is_ft_weight,
      })
      const token = jwt.sign(
        { _id: user?._id, name: user?.email },
        process.env.JWT_SECRET
      )
      return res.status(201).json({
        message: "User Registered and logged in.",
        token,
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
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong..." })
  }
}

export const loginWithoutCodeApple = async (req: Request, res: Response) => {
  const {
    login,
    appleToken,
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
    let user = await User.findOne({ appleToken })

    if (user) {
      // User already exists, update user with new data
      user = await User.findOneAndUpdate(
        { appleToken },
        {
          email: login,
          appleToken,
          sex,
          birth,
          height,
          is_ft_heigth,
          body_type,
          physical_activities,
          weight,
          is_ft_weight,
        },
        { new: true }
      )

      const token = jwt.sign(
        { _id: user?._id, name: user?.email, appleToken: user?.appleToken },
        process.env.JWT_SECRET
      )

      return res
        .status(201)
        .json({ message: "User Updated and logged in.", token })
    } else {
      user = await User.create({
        email: login,
        appleToken,
        sex,
        birth,
        height,
        is_ft_heigth,
        body_type,
        physical_activities,
        weight,
        is_ft_weight,
      })
      const token = jwt.sign(
        { _id: user?._id, name: user?.email, appleToken: user?.appleToken },
        process.env.JWT_SECRET
      )
      return res.status(201).json({
        message: "User Registered and logged in.",
        token,
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
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong..." })
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
        }
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
        { new: true }
      )

      sendCodeConfirmation(code, user.email)
      return res.status(201).json({
        message: "User Updated, confirmation code sent to email",
        user: user.email,
      })
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
      return res.status(200).json({
        message: "User registered, confirmation code sent to email",
        user: user.email,
      })
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong..." })
  }
}

export const getConfirmationCode = async (req: Request, res: Response) => {
  const { login } = req.body

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
        }
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
          status: "inactive",
        },
        { new: true }
      )

      sendCodeConfirmation(code, user.email)
      return res.status(201).json({
        message: "Confirmation code sent to email.",
        user: user.email,
      })
    } else {
      // User does not exist, send message
      return res.status(404).json({
        message: "No user found, please register.",
      })
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong..." })
  }
}

export const userLogin = async (req: Request, res: Response) => {
  const { login, code } = req.body

  try {
    const user = await User.findOne({ email: login })

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    const isMatch = await bcrypt.compare(code, user.code as any)

    if (!isMatch) {
      return res.status(422).json({ message: "Code is incorrect or expired" })
    }

    /* Set user status "active" after successfully logged in */
    await User.findOneAndUpdate(
      { email: login },
      {
        status: "active",
      }
    )
    const token = jwt.sign(
      { _id: user?._id, name: user?.email },
      process.env.JWT_SECRET
    )

    return res.status(201).json({
      message: "User Logged in",
      token,
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
  } catch (err) {
    res.status(500).json({ message: "Something went wrong..." })
  }
}

export const deactivateAccount = async (req: Request, res: Response) => {
  const { login } = req.body
  let code = generateCode()

  try {
    let user = await User.findOne({ email: login })

    if (!user) {
      return res.status(404).json({ message: "User not found" })
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
        }
      )
      return res
        .status(200)
        .json({ message: "Deactivation code sent to email" })
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong..." })
  }
}

export const confirmDeactivationCode = async (req: Request, res: Response) => {
  const { login, code } = req.body

  try {
    let user = await User.findOne({ email: login })

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    if (user) {
      if (user.deactivateCode === code) {
        user = await User.findOneAndDelete({ email: login })
        return res.status(200).json({ message: "Account deactivated" })
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong..." })
  }
}
