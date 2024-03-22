import { Request, Response } from "express"
import { decodeTokenAndGetUserId, isValidId } from "helpers"
import { Weight } from "models"

export const addUserWeight = async (req: Request, res: Response) => {
  const { weight, userId, date } = req.body
  try {
    const isValid = isValidId(userId)
    const isUserIdValid = decodeTokenAndGetUserId(req, userId)

    if (!isValid) {
      return res.status(422).json({ message: "Invalid userId" })
    }

    if (!isUserIdValid) {
      return res.status(403).json({ message: "Not authorized" })
    }

    await Weight.create({ weight, userId, date })

    res.status(201).json({ message: "Weight added" })
  } catch (error) {
    res.status(500).json({ message: "Something went wrong..." })
  }
}

export const getUserWeight = async (req: Request, res: Response) => {
  const { userId } = req.params
  const isValid = isValidId(userId)
  const isUserIdValid = decodeTokenAndGetUserId(req, userId)

  try {
    if (!isValid) {
      return res.status(422).json({ message: "Invalid userId" })
    }

    if (!isUserIdValid) {
      return res.status(403).json({ message: "Not authorized" })
    }

    const weights = await Weight.find({ userId }, { __v: 0 })

    res.status(200).json(weights)
  } catch (error) {
    res.status(500).json({ message: "Something went wrong..." })
  }
}

export const updateUserWeight = async (req: Request, res: Response) => {
  const { weight, userId, date } = req.body
  try {
    const isValid = isValidId(userId)
    const isUserIdValid = decodeTokenAndGetUserId(req, userId)

    if (!isValid) {
      return res.status(422).json({ message: "Invalid userId" })
    }

    if (!isUserIdValid) {
      return res.status(403).json({ message: "Not authorized" })
    }

    const updatedWeight = await Weight.findOneAndUpdate(
      { userId, date },
      { weight },
    )

    res.status(200).json({ updatedWeight, message: "Weight updated" })
  } catch (error) {
    res.status(500).json({ message: "Something went wrong..." })
  }
}
