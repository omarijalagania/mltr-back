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

// calories: { type: Number },
//       carbs: { type: Number },
//       fat: { type: Number },
//       protein: { type: Number },
//       water: { type: Number },
//       weight: { type: Number },
//       selectedDate: { type: String },
