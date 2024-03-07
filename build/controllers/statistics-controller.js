"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllStatistics = void 0;
var _helpers = require("../helpers");
var _models = require("../models");
const getAllStatistics = async (req, res) => {
  const {
    userId
  } = req.params;
  const isValid = (0, _helpers.isValidId)(userId);
  const isUserIdValid = (0, _helpers.decodeTokenAndGetUserId)(req, userId);
  try {
    if (!isUserIdValid) {
      return res.status(403).json({
        message: "Not authorized"
      });
    }
    if (!isValid) {
      return res.status(422).json({
        message: "Invalid userId"
      });
    }
    const history = await _models.UserFoodHistory.findOne({
      userId
    }).select({
      "userFoodHistoryList.carbs": 1,
      "userFoodHistoryList.fat": 1,
      "userFoodHistoryList.protein": 1,
      "userFoodHistoryList.water": 1,
      "userFoodHistoryList.weight": 1,
      "userFoodHistoryList.selectedDate": 1
    });
    if (!history) {
      return res.status(404).json({
        message: "No history found"
      });
    }
    const historyList = history.userFoodHistoryList;
    return res.status(200).send(historyList);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong..."
    });
  }
};

// calories: { type: Number },
//       carbs: { type: Number },
//       fat: { type: Number },
//       protein: { type: Number },
//       water: { type: Number },
//       weight: { type: Number },
//       selectedDate: { type: String },
exports.getAllStatistics = getAllStatistics;