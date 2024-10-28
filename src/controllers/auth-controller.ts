import { Request, Response } from "express"
import { User } from "models"
import { decodeTokenAndGetUserId, generateCode, isValidId } from "helpers"
import {
  codeConfirmationTemplate,
  codeSorryTemplate,
  sendCodeConfirmation,
} from "mail"
import { ObjectId } from "mongodb"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { welcomeToMLTRTemplate } from "mail/welcome-mltr"
import { welcomeToProTemplate } from "mail/pro-mltr"
import Queue from "bull"
import { codeConfirmationTemplateTest } from "mail/template-test"
import { sendBulkEmails } from "mail/mail-bulk"
import Joi from "joi"
import { defaultTemplate } from "mail/templateDefault"

const isValidEmail = Joi.string().email().required()

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
    ip,
    device,
    geo,
    personal_goal,
  } = req.body

  try {
    if (isValidEmail.validate(login).error) {
      return res.status(422).json({ message: "Invalid email" })
    }

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
          geo,
          personal_goal,
        },
        {
          new: true,
        },
      )
      const token = jwt.sign(
        { _id: user?._id, name: user?.email, isAdmin: user?.isAdmin },

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
        geo,
      })
      const token = jwt.sign(
        { _id: user?._id, name: user?.email, isAdmin: user?.isAdmin },

        process.env.JWT_SECRET,
      )

      sendCodeConfirmation(
        "49640",
        login,
        welcomeToMLTRTemplate,
        ip,
        device,
        "Welcome to Biteme",
      )

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
        geo: user.geo,
        personal_goal: user.personal_goal,
      })
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong..." })
  }
}

export const loginWithGoogle = async (req: Request, res: Response) => {
  const { login } = req.body

  try {
    if (isValidEmail.validate(login).error) {
      return res.status(422).json({ message: "Invalid email" })
    }

    let user = await User.findOne({ email: login })

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      })
    }

    const token = jwt.sign(
      { _id: user?._id, name: user?.email, isAdmin: user?.isAdmin },

      process.env.JWT_SECRET,
    )

    // Update the lastLogin time
    user.lastLogin = new Date()
    user.status = "active"
    await user.save()

    // Update the lastLogin time
    user.lastLogin = new Date()

    user.status = "active"
    await user.save()

    // Update the lastLogin time
    user.lastLogin = new Date()
    user.status = "active"
    await user.save()

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
      geo: user.geo,
      personal_goal: user.personal_goal,
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
    ip,
    device,
    geo,
    personal_goal,
  } = req.body

  try {
    if (isValidEmail.validate(login).error) {
      return res.status(422).json({ message: "Invalid email" })
    }

    let user = await User.findOne({ email: login })

    if (user) {
      // User already exists, update user with new data
      user = await User.findOneAndUpdate(
        { email: login },
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
          geo,
          personal_goal,
        },
        { new: true },
      )

      const token = jwt.sign(
        {
          _id: user?._id,
          name: user?.email,
          appleToken: user?.appleToken,
          isAdmin: user?.isAdmin,
        },
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
        geo,
        personal_goal,
      })
      const token = jwt.sign(
        {
          _id: user?._id,
          name: user?.email,
          appleToken: user?.appleToken,
          isAdmin: user?.isAdmin,
        },
        process.env.JWT_SECRET,
      )

      sendCodeConfirmation(
        "49640",
        login,
        welcomeToMLTRTemplate,
        ip,
        device,
        "Welcome to Biteme",
      )

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
        geo: user.geo,
        personal_goal: user.personal_goal,
      })
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong..." })
  }
}

export const loginWithApple = async (req: Request, res: Response) => {
  const { login } = req.body

  try {
    if (isValidEmail.validate(login).error) {
      return res.status(422).json({ message: "Invalid email" })
    }

    let user = await User.findOne({ email: login })

    if (user) {
      const token = jwt.sign(
        {
          _id: user?._id,
          name: user?.email,
          appleToken: user?.appleToken,
          isAdmin: user?.isAdmin,
        },
        process.env.JWT_SECRET,
      )

      // Update the lastLogin time
      user.lastLogin = new Date()
      user.status = "active"
      await user.save()

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
        geo: user.geo,
        personal_goal: user.personal_goal,
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
    ip,
    device,
    geo,
    personal_goal,
  } = req.body

  try {
    if (isValidEmail.validate(login).error) {
      return res.status(422).json({ message: "Invalid email" })
    }

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

    /* Delete user after one day after inactive status CHANGE */

    // setInterval(async () => {
    //   var query = { status: { $eq: "inactive" } }
    //   user = await User.deleteMany(query)
    // }, 86400000)

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
          geo,
          personal_goal,
        },
        {
          new: true,
        },
      )
      sendCodeConfirmation(
        code,
        login,
        codeConfirmationTemplate,
        ip,
        device,
        "Biteme verification code",
      )
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
        geo,
        personal_goal,
      })

      sendCodeConfirmation(
        code,
        login,
        codeConfirmationTemplate,
        ip,
        device,
        "Biteme verification code",
      )
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
  const { login, ip, device } = req.body

  try {
    // Validate email
    if (isValidEmail.validate(login).error) {
      return res.status(422).json({ message: "Invalid email" })
    }

    let code = generateCode()
    let user = await User.findOne({ email: login })

    if (user) {
      const salt = await bcrypt.genSalt(10)
      const hashedCode = await bcrypt.hash(code, salt)

      // Update the user with the new code and set status to inactive
      user = await User.findOneAndUpdate(
        { email: login },
        {
          code: hashedCode,
          status: "inactive",
        },
        { new: true },
      )

      // Send the confirmation code to the user's email
      if (user && user.email) {
        sendCodeConfirmation(
          code,
          user.email,
          codeConfirmationTemplate,
          ip,
          device,
          "Biteme verification code",
        )
      } else {
        return res.status(500).json({ message: "User email not found" })
      }

      // Use a timeout or job scheduler for deleting the code after 1 hour
      setTimeout(async () => {
        await User.findOneAndUpdate({ email: login }, { code: "" })
      }, 3600000) // 1 hour

      return res.status(201).json({
        message: "Confirmation code sent to email",
        user: user.email,
      })
    } else {
      return res.status(404).json({
        message: "User not found, please register first",
      })
    }
  } catch (error) {
    console.error(error) // Log the specific error for better debugging
    res.status(500).json({ message: "Something went wrong..." })
  }
}

export const userLogin = async (req: Request, res: Response) => {
  const { login, code } = req.body

  try {
    if (isValidEmail.validate(login).error) {
      return res.status(422).json({ message: "Invalid email" })
    }

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
      { email: login, status: { $in: ["active", "deleted"] } }, // Query criteria
      { status: "active" }, // Update operation
    )
    const token = jwt.sign(
      { _id: user?._id, name: user?.email, isAdmin: user?.isAdmin },
      process.env.JWT_SECRET,
    )

    // Update the lastLogin time
    user.lastLogin = new Date()
    user.status = "active"
    await user.save()

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
      geo: user.geo,
      personal_goal: user.personal_goal,
      isAdmin: user.isAdmin,
    })
  } catch (err) {
    res.status(500).json({ message: "Something went wrong..." })
  }
}

export const deactivateAccount = async (req: Request, res: Response) => {
  const { login, ip, device } = req.body

  let code = generateCode()

  try {
    if (isValidEmail.validate(login).error) {
      return res.status(422).json({ message: "Invalid email" })
    }

    let user = await User.findOne({ email: login })

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    //FOR TEST

    if (login == "test@gmail.com") {
      sendCodeConfirmation(
        "49640",
        login,
        codeSorryTemplate,
        ip,
        device,
        "Biteme account removal confirmation",
      )
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
      sendCodeConfirmation(
        code,
        login,
        codeSorryTemplate,
        ip,
        device,
        "Biteme account removal confirmation",
      )

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
    if (isValidEmail.validate(login).error) {
      return res.status(422).json({ message: "Invalid email" })
    }

    let user = await User.findOne({ email: login })

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    if (user.deactivateCode === code) {
      user.status = "deleted" // Assuming 'status' is the field to mark the user as deleted
      user.deletedAt = new Date()
      await user.save()
      return res
        .status(200)
        .json({ message: "Account status changed to deleted" })
    } else {
      return res.status(422).json({ message: "Wrong code" })
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong..." })
  }
}

// export const confirmDeactivationCode = async (req: Request, res: Response) => {
//   const { login, code } = req.body

//   try {
//     if (isValidEmail.validate(login).error) {
//       return res.status(422).json({ message: "Invalid email" })
//     }

//     let user = await User.findOne({ email: login })

//     if (!user) {
//       return res.status(404).json({ message: "User not found" })
//     }

//     if (user) {
//       if (user.deactivateCode === code) {
//         user = await User.findOneAndDelete({ email: login })
//         return res.status(200).json({ message: "Account deactivated" })
//       } else {
//         return res.status(422).json({ message: "Wrong code" })
//       }
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Something went wrong..." })
//   }
// }

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
    geo,
    personal_goal,
  } = req.body

  try {
    if (isValidEmail.validate(login).error) {
      return res.status(422).json({ message: "Invalid email" })
    }

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
          geo,
          personal_goal,
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
        geo,
        personal_goal,
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

    const newToken = jwt.sign(
      {
        _id: decoded.user?._id,
        name: decoded.user?.email,
        isAdmin: decoded.user?.isAdmin,
      },
      process.env.JWT_SECRET,
    )

    return res.status(200).json({ user: decoded, newToken })
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

    user.lastLogin = new Date()
    await user.save()

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: "Something went wrong..." })
  }
}

export const userBuyPro = async (req: Request, res: Response) => {
  const { login } = req.body
  try {
    if (isValidEmail.validate(login).error) {
      return res.status(422).json({ message: "Invalid email" })
    }

    sendCodeConfirmation(
      "49640",
      login,
      welcomeToProTemplate,
      "",
      "",
      "Welcome to Pro!",
    )
    return res.status(200).json({ message: "Pro subscription activated" })
  } catch (error) {
    res.status(500).json({ message: "Something went wrong..." })
  }
}

export const getUserDetails = async (req: Request, res: Response) => {
  const { userId } = req.params

  const isUserIdValid = decodeTokenAndGetUserId(req, userId)

  if (!isUserIdValid) {
    return res.status(403).json({ message: "Not authorized" })
  }

  try {
    const user = await User.aggregate([
      {
        $match: {
          _id: new ObjectId(userId),
        },
      },
      {
        $project: {
          code: 0,
          __v: 0,
        },
      },
      {
        $lookup: {
          from: "newtags",
          localField: "_id",
          foreignField: "userId",
          as: "newtags",
        },
      },
      {
        $lookup: {
          from: "weights",
          localField: "_id",
          foreignField: "userId",
          as: "weights",
        },
      },
      {
        $lookup: {
          from: "userfoodhistories",
          localField: "_id",
          foreignField: "userId",
          as: "userfoodhistories",
        },
      },

      {
        $lookup: {
          from: "userfoodlists",
          localField: "_id",
          foreignField: "userId",
          as: "userfoodlists",
        },
      },
    ])
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: "Something went wrong..." })
  }
}

//Admin Part

export const getAllUsers = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1
  const limit = parseInt(req.query.limit as string) || 10
  const sortField = req.query.sortField as string
  const sortOrder = req.query.sortOrder === "asc" ? 1 : -1
  const search = (req.query.search as string) || "" // Search term
  const inactiveDays = req.query.inactiveDays
    ? parseInt(req.query.inactiveDays as string)
    : null

  try {
    // Create the base query for search
    const query: any = search
      ? {
          $or: [
            { email: { $regex: search, $options: "i" } },
            { username: { $regex: search, $options: "i" } },
          ],
        }
      : {}

    // If inactiveDays is provided and greater than 0, apply inactivity filter
    if (inactiveDays && inactiveDays > 0) {
      const cutoffDate = new Date()
      cutoffDate.setDate(cutoffDate.getDate() - inactiveDays)

      query.lastLogin = { $lte: cutoffDate }
    }

    // Count total users for pagination
    const totalUsers = await User.countDocuments(query)
    const totalPages = Math.ceil(totalUsers / limit)

    // Fetch users with pagination and sorting
    let userQuery = User.find(query)
      .limit(limit)
      .skip((page - 1) * limit)
      .select("-code -__v -appleToken -deactivateCode")

    if (sortField) {
      userQuery = userQuery.sort({ [sortField]: sortOrder })
    }

    const users = await userQuery

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "Users not found" })
    }

    res.status(200).json({ users, page, limit, totalPages })
  } catch (error) {
    res.status(500).json({ message: "Something went wrong..." })
  }
}

const emailQueue = new Queue("emails", {
  redis: {
    host: "127.0.0.1",
    port: 6379,
  },
})

export const bulkEmailSend = async (req: Request, res: Response) => {
  try {
    const { emails, description, subject } = req.body // Assuming the array of emails is in req.body.emails

    if (!Array.isArray(emails)) {
      return res.status(400).json({ message: "Invalid email list" })
    }

    // Add each email to the queue
    emails.forEach((email) => {
      emailQueue.add({
        to: email,
        subject: subject,
        body: description,
      })
    })

    // Process the queue to send emails
    emailQueue.process(async (job) => {
      const { to, subject, body } = job.data

      await sendBulkEmails(to, codeConfirmationTemplateTest, body, subject)
    })

    res.status(200).json({ message: "Emails are being processed" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Something went wrong..." })
  }
}

export const adminUserUpdate = async (req: Request, res: Response) => {
  const { userId, isAdmin } = req.body

  const isValidIdParam = isValidId(userId)

  if (!isValidIdParam) {
    return res.status(422).json({ message: "Invalid user ID" })
  }

  try {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { isAdmin },
      { new: true },
    )
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.status(200).json({ message: "User updated", user })
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong..." })
  }
}

export const getUserDetailsAdmin = async (req: Request, res: Response) => {
  const { userId } = req.params

  const isUserIdValid = isValidId(userId)

  if (!isUserIdValid) {
    return res.status(403).json({ message: "Id is not valid" })
  }

  try {
    const user = await User.aggregate([
      {
        $match: {
          _id: new ObjectId(userId),
        },
      },
      {
        $project: {
          code: 0,
          __v: 0,
        },
      },
      {
        $lookup: {
          from: "newtags",
          localField: "_id",
          foreignField: "userId",
          as: "newtags",
        },
      },
      {
        $lookup: {
          from: "weights",
          localField: "_id",
          foreignField: "userId",
          as: "weights",
        },
      },
      {
        $lookup: {
          from: "userfoodhistories",
          localField: "_id",
          foreignField: "userId",
          as: "userfoodhistories",
        },
      },

      {
        $lookup: {
          from: "userfoodlists",
          localField: "_id",
          foreignField: "userId",
          as: "userfoodlists",
        },
      },
    ])
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: "Something went wrong..." })
  }
}

export const testFunc = async (req: Request, res: Response) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- Dark Mode meta tags -->
    <meta name="color-scheme" content="light dark">
    <meta name="supported-color-schemes" content="light dark only">
    <title>Confirm Code</title>

    <style>
      /* Inline styles for maximum compatibility */
      body {
        padding: 15px;
      }

      h1 {
        color: #8be100;
        font-size: 44px;
        line-height: 40px;
        font-weight: 700;
      }

      /* Styles for dark mode */
      [data-ogsc="dark-mode"] body {
        background-color: #000000 !important;
        color: #ffffff !important;
      }
      [data-ogsc="dark-mode"] h1 {
        color: red !important; /* Dark mode green color */
      }

      /* Media query for devices with width less than 350px */
      @media only screen and (max-width: 350px) {
        .remove-padding {
          padding: 0 !important;
          margin: 0 !important;
        }
      }

      @media (prefers-color-scheme: dark) {
        h1 {
          color: #8be100 !important;
        }
      }
    </style>

  </head>
  <body data-ogsc="light-mode">
    <img src="${process.env.BACKEND_URL}/images/mltr.png" alt="mltr" />

   <p>Test Body text</p>

    <!-- One -->

    <div style="display: flex; margin-bottom: 20px">
      <p
        style="
          font-weight: 400;
          font-size: 16px;
          line-height: 22px;
          padding-right: 40px;
        "
      >
        If you did not request this verification code, please disregard this
        email. If you have any questions or concerns, please contact our support
        team at
        <span
          style="
            color: #c4ff46;
            font-weight: 700;
            font-size: 16px;
            line-height: 22px;
          "
          >mltr.support@onyxlabs.tech</span
        >
      </p>
    </div>

    <!-- Explore -->

    <div style="margin-top: 40px">
      <p style="font-weight: 400; font-size: 16px; line-height: 22px">
        Warm regards,
      </p>

      <p style="font-weight: 400; font-size: 16px; line-height: 22px">
        The MLTR Team
      </p>
    </div>

    <!-- Footer -->
   <hr style="margin-top: 60px" />
       <table style="width: 95%; margin-top: 60px; padding: 10px 0; border-collapse: collapse;">
      <tr>
        <td style="padding-right: 5px;">
          <img src="${process.env.BACKEND_URL}/images/onyx.png" alt="onyx" />
        </td>
        <td style="padding-right: 5px;">
          <a style="color: #7c7c7c; font-weight: 400; font-size: 14px; line-height: 20px; text-decoration: none;" href="https://mltr.app/policies/terms.html">
            ONYX Labs
          </a>
        </td>
        <td style="padding-right: 5px;">
          <a style="color: #c4ff46; font-weight: 400; font-size: 14px; line-height: 20px; text-decoration: none;" href="https://mltr.app/policies/terms.html">
            Terms and Conditions
          </a>
        </td>
        <td>
          <a style="color: #c4ff46; font-weight: 400; font-size: 14px; line-height: 20px; text-decoration: none;" href="https://mltr.app/policies/privacy.html">
            Privacy Policy
          </a>
        </td>
      </tr>
    </table>
  </body>
</html>`)
}
