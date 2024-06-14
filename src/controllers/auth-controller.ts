import { Request, Response } from "express"
import { User } from "models"
import { generateCode } from "helpers"
import {
  codeConfirmationTemplate,
  codeSorryTemplate,
  sendCodeConfirmation,
} from "mail"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { welcomeToMLTRTemplate } from "mail/welcome-mltr"
import { welcomeToProTemplate } from "mail/pro-mltr"

export const registerWithGoogle = async (req: Request, res: Response) => {
  const {
    login,
    username,
    sex,
    birth,
    height,
    is_ft_heigth,
    body_type,
    physical_activities,
    weight,
    is_ft_weight,
    protein,
    calories,
    carbs,
    fat,
    customGoal,
    water,
  } = req.body

  try {
    let user = await User.findOne({ email: login })

    if (user) {
      user = await User.findOneAndUpdate(
        { email: login },
        {
          email: login,
          username,
          sex,
          birth,
          height,
          is_ft_heigth,
          body_type,
          physical_activities,
          weight,
          is_ft_weight,
          protein,
          calories,
          carbs,
          fat,
          customGoal,
          water,
        },
        {
          new: true,
        },
      )
      const token = jwt.sign(
        { _id: user?._id, name: user?.email },
        process.env.JWT_SECRET,
      )

      return res.status(201).json({
        message: "User updated and logged in",
        token,
      })
    } else {
      // Create new user
      user = await User.create({
        email: login,
        username,
        sex,
        birth,
        height,
        is_ft_heigth,
        body_type,
        physical_activities,
        weight,
        is_ft_weight,
        protein,
        calories,
        carbs,
        fat,
        customGoal,
        water,
      })
      const token = jwt.sign(
        { _id: user?._id, name: user?.email },
        process.env.JWT_SECRET,
      )

      sendCodeConfirmation("49640", login, welcomeToMLTRTemplate)

      return res.status(201).json({
        message: "User Registered and logged in",
        token,
        _id: user._id,
        email: user.email,
        username: user.username,
        sex: user.sex,
        birth: user.birth,
        height: user.height,
        is_ft_heigth: user.is_ft_heigth,
        body_type: user.body_type,
        physical_activities: user.physical_activities,
        weight: user.weight,
        is_ft_weight: user.is_ft_weight,
        protein: user.protein,
        calories: user.calories,
        carbs: user.carbs,
        fat: user.fat,
        customGoal: user.customGoal,
        water: user.water,
      })
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong..." })
  }
}

export const loginWithGoogle = async (req: Request, res: Response) => {
  const { login } = req.body

  try {
    let user = await User.findOne({ email: login })

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      })
    }

    const token = jwt.sign(
      { _id: user?._id, name: user?.email },
      process.env.JWT_SECRET,
    )

    return res.status(200).json({
      message: "User logged in",
      token,
      _id: user._id,
      email: user.email,
      username: user.username,
      sex: user.sex,
      birth: user.birth,
      height: user.height,
      is_ft_heigth: user.is_ft_heigth,
      body_type: user.body_type,
      physical_activities: user.physical_activities,
      weight: user.weight,
      is_ft_weight: user.is_ft_weight,
      protein: user.protein,
      calories: user.calories,
      carbs: user.carbs,
      fat: user.fat,
      customGoal: user.customGoal,
      water: user.water,
    })
  } catch (error) {
    res.status(500).json({ message: "Something went wrong..." })
  }
}

export const registerWithApple = async (req: Request, res: Response) => {
  const {
    login,
    appleToken,
    username,
    sex,
    birth,
    height,
    is_ft_heigth,
    body_type,
    physical_activities,
    weight,
    is_ft_weight,
    protein,
    calories,
    carbs,
    fat,
    customGoal,
    water,
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
          username,
          sex,
          birth,
          height,
          is_ft_heigth,
          body_type,
          physical_activities,
          weight,
          is_ft_weight,
          protein,
          calories,
          carbs,
          fat,
          customGoal,
          water,
        },
        { new: true },
      )

      const token = jwt.sign(
        { _id: user?._id, name: user?.email, appleToken: user?.appleToken },
        process.env.JWT_SECRET,
      )

      return res
        .status(201)
        .json({ message: "User Updated and logged in", token })
    } else {
      // Create new user
      user = await User.create({
        email: login,
        appleToken,
        username: sex,
        birth,
        height,
        is_ft_heigth,
        body_type,
        physical_activities,
        weight,
        is_ft_weight,
        protein,
        calories,
        carbs,
        fat,
        customGoal,
        water,
      })
      const token = jwt.sign(
        { _id: user?._id, name: user?.email, appleToken: user?.appleToken },
        process.env.JWT_SECRET,
      )

      sendCodeConfirmation("49640", login, welcomeToMLTRTemplate)

      return res.status(201).json({
        message: "User Registered and logged in",
        token,
        _id: user._id,
        email: user.email,
        username: user.username,
        sex: user.sex,
        birth: user.birth,
        height: user.height,
        is_ft_heigth: user.is_ft_heigth,
        body_type: user.body_type,
        physical_activities: user.physical_activities,
        weight: user.weight,
        is_ft_weight: user.is_ft_weight,
        protein: user.protein,
        calories: user.calories,
        carbs: user.carbs,
        fat: user.fat,
        customGoal: user.customGoal,
        water: user.water,
      })
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong..." })
  }
}

export const loginWithApple = async (req: Request, res: Response) => {
  const { appleToken } = req.body

  try {
    let user = await User.findOne({ appleToken })

    if (user) {
      const token = jwt.sign(
        { _id: user?._id, name: user?.email, appleToken: user?.appleToken },
        process.env.JWT_SECRET,
      )
      return res.status(201).json({
        message: "User logged in",
        token,
        _id: user._id,
        email: user.email,
        username: user.username,
        sex: user.sex,
        birth: user.birth,
        height: user.height,
        is_ft_heigth: user.is_ft_heigth,
        body_type: user.body_type,
        physical_activities: user.physical_activities,
        weight: user.weight,
        is_ft_weight: user.is_ft_weight,
        protein: user.protein,
        calories: user.calories,
        carbs: user.carbs,
        fat: user.fat,
        customGoal: user.customGoal,
        water: user.water,
      })
    }
    if (!user) {
      res.status(404).json({ message: "User not found" })
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong..." })
  }
}

export const userRegister = async (req: Request, res: Response) => {
  const {
    login,
    username,
    sex,
    birth,
    height,
    is_ft_heigth,
    body_type,
    physical_activities,
    weight,
    is_ft_weight,
    protein,
    calories,
    carbs,
    fat,
    customGoal,
    water,
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
      // User already exists, send message on response
      user = await User.findOneAndUpdate(
        {
          email: login,
        },
        {
          code: hashedCode,
          username,
          sex,
          birth,
          height,
          is_ft_heigth,
          body_type,
          physical_activities,
          weight,
          is_ft_weight,
          protein,
          calories,
          carbs,
          fat,
          customGoal,
          water,
          status: "inactive",
        },
        {
          new: true,
        },
      )
      sendCodeConfirmation(code, login, codeConfirmationTemplate)
      return res.status(200).json({
        message: "User updated, confirmation code sent to email",
        user: user.email,
      })
    } else {
      // User does not exist, create new user with provided data
      user = await User.create({
        email: login,
        code: hashedCode,
        username,
        sex,
        birth,
        height,
        is_ft_heigth,
        body_type,
        physical_activities,
        weight,
        is_ft_weight,
        protein,
        calories,
        carbs,
        fat,
        customGoal,
        water,
        status: "inactive",
      })

      sendCodeConfirmation(code, login, codeConfirmationTemplate)
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
          status: "inactive",
        },
        { new: true },
      )

      sendCodeConfirmation(code, user.email, codeConfirmationTemplate)
      return res.status(201).json({
        message: "Confirmation code sent to email",
        user: user.email,
      })
    } else {
      // User does not exist, send message
      return res.status(404).json({
        message: "User not found, please register first",
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

    // FOR TESTING

    let testCode = false

    if (code === "49640" && login === "test@gmail.com") {
      testCode = true
    }

    if (!testCode) {
      const isMatch = await bcrypt.compare(code, user.code as any)

      if (!isMatch) {
        return res.status(422).json({ message: "Code is incorrect or expired" })
      }
    }

    // FOR TESTING END

    // const isMatch = await bcrypt.compare(code, user.code as any)

    // if (!isMatch) {
    //   return res.status(422).json({ message: "Code is incorrect or expired" })
    // }

    /* Set user status "active" after successfully logged in */
    await User.findOneAndUpdate(
      { email: login },
      {
        status: "active",
      },
    )
    const token = jwt.sign(
      { _id: user?._id, name: user?.email },
      process.env.JWT_SECRET,
    )

    return res.status(201).json({
      message: "User Logged in",
      token,
      _id: user._id,
      email: user.email,
      username: user.username,
      sex: user.sex,
      birth: user.birth,
      height: user.height,
      is_ft_heigth: user.is_ft_heigth,
      body_type: user.body_type,
      physical_activities: user.physical_activities,
      weight: user.weight,
      is_ft_weight: user.is_ft_weight,
      protein: user.protein,
      calories: user.calories,
      carbs: user.carbs,
      fat: user.fat,
      customGoal: user.customGoal,
      water: user.water,
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

    //FOR TEST

    if (login == "test@gmail.com") {
      sendCodeConfirmation("49640", login, codeSorryTemplate)
      user = await User.findOneAndUpdate(
        {
          email: login,
        },
        {
          deactivateCode: "49640",
        },
        {
          new: true,
        },
      )
      return res
        .status(200)
        .json({ message: "Deactivation code sent to test email" })
    }

    // FOR TEST END
    else {
      sendCodeConfirmation(code, login, codeSorryTemplate)

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
      } else {
        return res.status(422).json({ message: "Wrong code" })
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong..." })
  }
}

export const updateUser = async (req: Request, res: Response) => {
  const {
    login,
    username,
    sex,
    birth,
    height,
    is_ft_heigth,
    body_type,
    physical_activities,
    weight,
    is_ft_weight,
    protein,
    calories,
    carbs,
    fat,
    customGoal,
    water,
  } = req.body

  try {
    let user = await User.findOne({ email: login })

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    } else {
      // If User already exists, update user with new data
      user = await User.findOneAndUpdate(
        { email: login },
        {
          email: login,
          username,
          sex,
          birth,
          height,
          is_ft_heigth,
          body_type,
          physical_activities,
          weight,
          is_ft_weight,
          protein,
          calories,
          carbs,
          fat,
          customGoal,
          water,
        },
        { new: true },
      )
      // Return updated user on response
      return res.status(201).json({
        message: "User Updated",
        email: login,
        username,
        sex,
        birth,
        height,
        is_ft_heigth,
        body_type,
        physical_activities,
        weight,
        is_ft_weight,
        protein,
        calories,
        carbs,
        fat,
        customGoal,
        water,
      })
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong..." })
  }
}

export const tokenVerify = async (req: Request, res: Response) => {
  try {
    const authHeader: string | undefined = req.headers.authorization
    if (!authHeader) {
      return res
        .status(422)
        .json({ message: "Authorization header not present" })
    }

    const token: string = authHeader.split(" ")[1]
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET)
    return res.status(200).json({ user: decoded })
  } catch (error) {
    return res.status(422).json({ message: "invalid token" })
  }
}

export const getUser = async (req: Request, res: Response) => {
  const { userId } = req.query

  try {
    const user = await User.findById(userId)

    if (!user) {
      return res.status(4040).json({ message: "user not found" })
    }

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: "Something went wrong..." })
  }
}

export const userBuyPro = async (req: Request, res: Response) => {
  const { login } = req.body
  try {
    sendCodeConfirmation("49640", login, welcomeToProTemplate)
  } catch (error) {
    res.status(500).json({ message: "Something went wrong..." })
  }
}
