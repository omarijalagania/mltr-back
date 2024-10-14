import e, { Request, Response } from "express"
import { decodeTokenAndGetUserId, isValidId } from "helpers"
import { History, UserFoodHistory, UserFoodList } from "models"

export const createHistory = async (req: Request, res: Response) => {
  const { userId, weight, date } = req.body

  if (
    weight === undefined ||
    date === undefined ||
    weight === "" ||
    date === ""
  ) {
    return res.status(422).json({ message: "Fill all the fields" })
  }

  const isValid = isValidId(userId)

  try {
    if (!isValid) {
      return res.status(422).json({ message: "Invalid userId" })
    }
    const newHistory = await History.create({ userId, date, weight })
    return res
      .status(201)
      .json({ message: "History added", history: newHistory })
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong..." })
  }
}

export const getHistory = async (req: Request, res: Response) => {
  const { userId } = req.body
  const isValid = isValidId(userId)

  try {
    if (!isValid) {
      return res.status(422).json({ message: "Invalid userId" })
    }
    const history = await History.find({ userId })

    if (!history) {
      return res.status(404).json({ message: "History not found" })
    }
    return res.status(200).json({ history })
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong..." })
  }
}

export const editHistory = async (req: Request, res: Response) => {
  const { userId, historyId, date, weight } = req.body

  const isValidUserId = isValidId(userId)
  const isValidHistoryId = isValidId(historyId)

  if (
    weight === undefined ||
    date === undefined ||
    weight === "" ||
    date === ""
  ) {
    return res.status(422).json({ message: "Fill all the fields" })
  }

  try {
    if (!isValidUserId || !isValidHistoryId) {
      return res.status(422).json({ message: "Invalid Id" })
    }
    const newHistory = await History.findOneAndUpdate(
      { _id: historyId, userId },
      { date, weight },
      { new: true },
    )
    return res
      .status(201)
      .json({ message: "History edited", UpdatedHistory: newHistory })
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong..." })
  }
}

export const deleteHistory = async (req: Request, res: Response) => {
  const { userId, historyId } = req.body

  const isValidUserId = isValidId(userId)
  const isValidHistoryId = isValidId(historyId)

  try {
    if (!isValidUserId || !isValidHistoryId) {
      return res.status(422).json({ message: "Invalid Id" })
    }
    await History.deleteOne({ _id: historyId, userId })
    return res.status(200).json({ message: "History deleted" })
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong..." })
  }
}

// new HistoryController().router

export const getAllHistory = async (req: Request, res: Response) => {
  const { userId } = req.params

  const isValid = isValidId(userId)

  const isUserIdValid = decodeTokenAndGetUserId(req, userId)

  try {
    if (!isUserIdValid) {
      return res.status(403).json({ message: "Not authorized" })
    }

    if (!isValid) {
      return res.status(422).json({ message: "Invalid userId" })
    }

    const history = await UserFoodHistory.find({ userId })
    return res.status(200).json({ history })
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong..." })
  }
}

export const addNewHistory = async (req: Request, res: Response) => {
  const { userId, userFoodHistoryList } = req.body

  const isUserIdValid = decodeTokenAndGetUserId(req, userId)

  try {
    if (!isUserIdValid) {
      return res.status(403).json({ message: "Not authorized" })
    }

    const history = await UserFoodHistory.findOne({ userId })

    if (history) {
      const userFoodHistory = await UserFoodHistory.findOneAndUpdate(
        { userId: userId },
        { $push: { userFoodHistoryList: userFoodHistoryList } },
        { new: true },
      )
      return res.status(200).json(userFoodHistory)
    }

    const newHistory = await UserFoodHistory.create({
      userId,
      userFoodHistoryList,
    })

    return res
      .status(201)
      .json({ message: "History added", history: newHistory })
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong..." })
  }
}

export const editNewHistory = async (req: Request, res: Response) => {
  const { userId, userFoodHistoryList, selectedDate } = req.body

  const isUserIdValid = decodeTokenAndGetUserId(req, userId)

  try {
    if (!isUserIdValid) {
      return res.status(403).json({ message: "Not authorized" })
    }

    const newHistory = await UserFoodHistory.findOneAndUpdate(
      { userId, "userFoodHistoryList.selectedDate": selectedDate },
      { $set: { "userFoodHistoryList.$": userFoodHistoryList } },
      { new: true },
    )

    return res
      .status(201)
      .json({ message: "History edited", history: newHistory })
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong..." })
  }
}

export const deleteNewHistory = async (req: Request, res: Response) => {
  const { userId, historyId } = req.body

  const isUserIdValid = decodeTokenAndGetUserId(req, userId)

  try {
    if (!isUserIdValid) {
      return res.status(403).json({ message: "Not authorized" })
    }

    await UserFoodHistory.deleteOne({ userId, _id: historyId })

    return res.status(200).json({ message: "History deleted" })
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong..." })
  }
}

export const deleteAllHistory = async (req: Request, res: Response) => {
  const { userId } = req.body

  const isUserIdValid = decodeTokenAndGetUserId(req, userId)

  try {
    if (!isUserIdValid) {
      return res.status(403).json({ message: "Not authorized" })
    }

    await UserFoodHistory.deleteMany({ userId })

    return res.status(200).json({ message: "History deleted" })
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong..." })
  }
}

export const editNewHistoryParts = async (req: Request, res: Response) => {
  const { userId, historyList, foodId } = req.body

  const isUserIdValid = decodeTokenAndGetUserId(req, userId)

  try {
    if (!isUserIdValid) {
      return res.status(403).json({ message: "Not authorized" })
    }

    const historyListBack = await UserFoodHistory.findOne({
      userId,
      "userFoodHistoryList._id": foodId,
    })

    if (!historyListBack) {
      return res.status(404).json({ message: "History not found 1" })
    }

    const foodListArr = historyListBack.userFoodHistoryList.filter(
      //@ts-ignore
      (item) => item._id.toString() === foodId,
    )

    const mergedArr = [...historyList, ...foodListArr]

    if (mergedArr.length === 2) {
      const obj1 = mergedArr[0]
      const obj2 = mergedArr[1]

      const mergedObject = { ...obj1, ...obj2, foodList: [...obj2.foodList] }

      obj1.foodList.forEach((food: any) => mergedObject.foodList.push(food))

      delete mergedObject.__parentArray
      delete mergedObject.__index
      delete mergedObject.$__parent
      delete mergedObject.$__
      delete mergedObject._doc
      delete mergedObject.$isNew

      const updatedMerged = await UserFoodHistory.findOneAndUpdate(
        {
          userId,
          "userFoodHistoryList._id": foodId,
        },
        {
          $set: { "userFoodHistoryList.$": mergedObject },
        },
      )

      return res.status(200).json({ message: "History List", updatedMerged })
    } else {
      return res.status(404).json({ message: "History not found 2" })
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong..." })
  }
}

export const deleteSpecificFoodFromHistory = async (
  req: Request,
  res: Response,
) => {
  const { userId, foodId, historyList } = req.body

  const isUserIdValid = decodeTokenAndGetUserId(req, userId)

  try {
    if (!isUserIdValid) {
      return res.status(403).json({ message: "Not authorized" })
    }

    const historyListBack = await UserFoodHistory.findOne({
      userId,
      "userFoodHistoryList._id": foodId,
    })

    if (!historyListBack) {
      return res.status(404).json({ message: "History not found" })
    }

    const foodListArr = historyListBack.userFoodHistoryList.filter(
      //@ts-ignore
      (item) => item._id.toString() === foodId,
    )

    const mergedArr = [...historyList, ...foodListArr]

    if (mergedArr.length === 2) {
      const obj1 = mergedArr[0]
      const obj2 = mergedArr[1]

      const foodToRemove = obj1.foodList[0]._id.toString()

      // Filter out the object from obj2.foodList based on the _id
      obj2.foodList = obj2.foodList.filter(
        (food: { _id: any }) => food._id.toString() !== foodToRemove,
      )

      obj1.foodList = obj1.foodList.filter(
        (food: { _id: any }) => food._id.toString() !== foodToRemove,
      )

      // Merge properties except foodList
      let mergedObject = {
        ...obj1,
        ...obj2,
        foodList: [...obj2.foodList, ...obj1.foodList],
      }

      // Remove unwanted properties if needed
      delete mergedObject.__parentArray
      delete mergedObject.__index
      delete mergedObject.$__parent
      delete mergedObject.$__
      delete mergedObject._doc
      delete mergedObject.$isNew

      const updatedMerged = await UserFoodHistory.findOneAndUpdate(
        {
          userId,
          "userFoodHistoryList._id": foodId,
        },
        {
          $set: { "userFoodHistoryList.$": mergedObject },
        },
        { new: true },
      )

      return res.status(200).json({ message: "History List", updatedMerged })
    } else {
      return res.status(404).json({ message: "History not found" })
    }
  } catch (error) {
    console.error("Error deleting food from history:", error) // Debugging log
    return res.status(500).json({ message: "Something went wrong..." })
  }
}
