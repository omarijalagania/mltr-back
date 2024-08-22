import { Request, Response } from "express"
import { decodeTokenAndGetUserId, isValidId } from "helpers"
import { UserFoodHistory } from "models"

export const getAllStatistics = async (req: Request, res: Response) => {
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

    const history = await UserFoodHistory.findOne({ userId }).select({
      "userFoodHistoryList.carbs": 1,
      "userFoodHistoryList.fat": 1,
      "userFoodHistoryList.protein": 1,
      "userFoodHistoryList.water": 1,
      "userFoodHistoryList.calories": 1,
      "userFoodHistoryList.weight": 1,
      "userFoodHistoryList.selectedDate": 1,
    })

    if (!history) {
      return res.status(404).json({ message: "No history found" })
    }

    const historyList = history.userFoodHistoryList.filter((item) => {
      return !(
        item.carbs === 0 &&
        item.fat === 0 &&
        item.protein === 0 &&
        item.water === 0 &&
        item.weight === 0
      )
    })

    return res.status(200).send(historyList)
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong..." })
  }
}

export const getStatisticsBetweenDates = async (
  req: Request,
  res: Response,
) => {
  const { userId, startDate, endDate } = req.params

  try {
    const history = await UserFoodHistory.findOne({
      userId,
    }).select({
      "userFoodHistoryList.carbs": 1,
      "userFoodHistoryList.fat": 1,
      "userFoodHistoryList.protein": 1,
      "userFoodHistoryList.water": 1,
      "userFoodHistoryList.calories": 1,
      "userFoodHistoryList.weight": 1,
      "userFoodHistoryList.selectedDate": 1,
    })

    if (!history) {
      return res.status(404).json({ message: "No history found" })
    }

    const filteredByDate = history.userFoodHistoryList?.filter((item: any) => {
      return item?.selectedDate >= startDate && item?.selectedDate <= endDate
    })

    const historyList = filteredByDate?.filter((item) => {
      return !(
        item.carbs === 0 &&
        item.fat === 0 &&
        item.protein === 0 &&
        item.water === 0 &&
        item.weight === 0
      )
    })

    return res.status(200).send(historyList)
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong..." })
  }
}

export const getWeightStatistics = async (req: Request, res: Response) => {
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

    const history = await UserFoodHistory.findOne({ userId }).select({
      "userFoodHistoryList.weight": 1,
      "userFoodHistoryList.selectedDate": 1,
    })

    if (!history) {
      return res.status(404).json({ message: "No history found" })
    }

    const historyList = history.userFoodHistoryList

    return res.status(200).send(historyList)
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong..." })
  }
}
