import { Request, Response } from "express"
import { decodeTokenAndGetUserId, isValidId } from "helpers"
import { History, UserFoodHistory } from "models"

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

  console.log("userFoodHistoryList", selectedDate)

  const isUserIdValid = decodeTokenAndGetUserId(req, userId)

  try {
    if (!isUserIdValid) {
      return res.status(403).json({ message: "Not authorized" })
    }

    const newHistory = await UserFoodHistory.findOneAndUpdate(
      { userId, "userFoodHistoryList.selectedDate": selectedDate },
      { userFoodHistoryList },
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
