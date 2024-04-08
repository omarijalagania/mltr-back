import { Request, Response } from "express"
import { convertToJSON, decodeTokenAndGetUserId } from "helpers"
import { UserFoodList } from "models"
import mongoose from "mongoose"

export const getAllFoods = async (req: Request, res: Response) => {
  const { userId } = req.query

  const isUserIdValid = decodeTokenAndGetUserId(req, userId as string)

  try {
    if (!isUserIdValid) {
      return res.status(403).json({ message: "Not authorized" })
    }

    const userFoodList = await UserFoodList.findOne(
      { userId },
      { userFoodList: 1, userId: 1 },
    )
    res.status(200).json(userFoodList)
  } catch (error) {
    res.status(500).json({ message: "Internal server error" })
  }
}

export const addFood = async (req: Request, res: Response) => {
  const { userId, food } = req.body

  const convertedUserId = new mongoose.Types.ObjectId(userId)

  const isUserIdValid = decodeTokenAndGetUserId(req, userId)

  try {
    if (!isUserIdValid) {
      return res.status(403).json({ message: "Not authorized" })
    }

    const user = await UserFoodList.findOne({ userId: convertedUserId })

    if (user) {
      const userFoodList = await UserFoodList.findOneAndUpdate(
        { userId: convertedUserId },
        { $push: { userFoodList: food } },
        { new: true },
      )
      return res.status(200).json(userFoodList)
    }

    const userFood = await UserFoodList.create({
      userId: convertedUserId,
      userFoodList: [food],
    })
    res.status(200).json(userFood)
  } catch (error) {
    res.status(500).json({ message: "Internal server error" })
  }
}

export const removeFood = async (req: Request, res: Response) => {
  const { userId, foodId, recipeId } = req.body

  const isUserIdValid = decodeTokenAndGetUserId(req, userId)

  try {
    if (!isUserIdValid) {
      return res.status(403).json({ message: "Not authorized" })
    }

    if (recipeId) {
      await UserFoodList.updateOne(
        { userId, "userFoodList._id": foodId },
        { $pull: { "userFoodList.$.foodList": { _id: recipeId } } },
      )

      return res.status(200).json({ message: "Recipe removed" })
    }

    await UserFoodList.updateOne(
      { userId, "userFoodList._id": foodId }, // find a document with userId and foodId
      { "userFoodList.$.isRemoved": true }, // set isRemoved to true
    )

    res.status(200).json({ message: "Food removed" })
  } catch (error) {
    res.status(500).json({ message: "Internal server error" })
  }
}

export const updateFood = async (req: Request, res: Response) => {
  const { userId, foodId, food, foodList } = req.body

  const isUserIdValid = decodeTokenAndGetUserId(req, userId)

  const updatedProperties = {} as { [key: string]: any }
  for (const key in food) {
    if (food.hasOwnProperty(key)) {
      updatedProperties[`userFoodList.$.${key}`] = food[key]
    }
  }

  try {
    if (!isUserIdValid) {
      return res.status(403).json({ message: "Not authorized" })
    }

    await UserFoodList.findOneAndUpdate(
      { userId, "userFoodList._id": foodId },
      {
        $set: {
          ...updatedProperties,
          "userFoodList.$.foodList": foodList,
        },
      },
      { new: true },
    )

    return res.status(200).json({ message: "Food updated" })
  } catch (error) {
    res.status(500).json({ message: "Internal server error" })
  }
}

export const generateText = async (req: Request, res: Response) => {
  const { obj } = req.body

  try {
    const resp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta3/models/text-bison-001:generateText?key=${process.env.GENERATIVE_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: `{"prompt": {"text" : ${JSON.stringify(obj)}}}`,
      },
    )
    const data = await resp.json()
    const output = data.candidates[0]?.output

    const outputString = JSON.stringify(output)

    res.status(200).send(outputString)
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error })
  }
}
