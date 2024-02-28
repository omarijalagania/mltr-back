"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHistory = exports.getAllHistory = exports.editNewHistory = exports.editHistory = exports.deleteNewHistory = exports.deleteHistory = exports.createHistory = exports.addNewHistory = void 0;
var _helpers = require("../helpers");
var _models = require("../models");
const createHistory = async (req, res) => {
  const {
    userId,
    weight,
    date
  } = req.body;
  if (weight === undefined || date === undefined || weight === "" || date === "") {
    return res.status(422).json({
      message: "Fill all the fields"
    });
  }
  const isValid = (0, _helpers.isValidId)(userId);
  try {
    if (!isValid) {
      return res.status(422).json({
        message: "Invalid userId"
      });
    }
    const newHistory = await _models.History.create({
      userId,
      date,
      weight
    });
    return res.status(201).json({
      message: "History added",
      history: newHistory
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong..."
    });
  }
};
exports.createHistory = createHistory;
const getHistory = async (req, res) => {
  const {
    userId
  } = req.body;
  const isValid = (0, _helpers.isValidId)(userId);
  try {
    if (!isValid) {
      return res.status(422).json({
        message: "Invalid userId"
      });
    }
    const history = await _models.History.find({
      userId
    });
    if (!history) {
      return res.status(404).json({
        message: "History not found"
      });
    }
    return res.status(200).json({
      history
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong..."
    });
  }
};
exports.getHistory = getHistory;
const editHistory = async (req, res) => {
  const {
    userId,
    historyId,
    date,
    weight
  } = req.body;
  const isValidUserId = (0, _helpers.isValidId)(userId);
  const isValidHistoryId = (0, _helpers.isValidId)(historyId);
  if (weight === undefined || date === undefined || weight === "" || date === "") {
    return res.status(422).json({
      message: "Fill all the fields"
    });
  }
  try {
    if (!isValidUserId || !isValidHistoryId) {
      return res.status(422).json({
        message: "Invalid Id"
      });
    }
    const newHistory = await _models.History.findOneAndUpdate({
      _id: historyId,
      userId
    }, {
      date,
      weight
    }, {
      new: true
    });
    return res.status(201).json({
      message: "History edited",
      UpdatedHistory: newHistory
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong..."
    });
  }
};
exports.editHistory = editHistory;
const deleteHistory = async (req, res) => {
  const {
    userId,
    historyId
  } = req.body;
  const isValidUserId = (0, _helpers.isValidId)(userId);
  const isValidHistoryId = (0, _helpers.isValidId)(historyId);
  try {
    if (!isValidUserId || !isValidHistoryId) {
      return res.status(422).json({
        message: "Invalid Id"
      });
    }
    await _models.History.deleteOne({
      _id: historyId,
      userId
    });
    return res.status(200).json({
      message: "History deleted"
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong..."
    });
  }
};

// new HistoryController().router
exports.deleteHistory = deleteHistory;
const getAllHistory = async (req, res) => {
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
    const history = await _models.UserFoodHistory.find({
      userId
    });
    return res.status(200).json({
      history
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong..."
    });
  }
};
exports.getAllHistory = getAllHistory;
const addNewHistory = async (req, res) => {
  const {
    userId,
    userFoodHistoryList
  } = req.body;
  const isUserIdValid = (0, _helpers.decodeTokenAndGetUserId)(req, userId);
  try {
    if (!isUserIdValid) {
      return res.status(403).json({
        message: "Not authorized"
      });
    }
    const newHistory = await _models.UserFoodHistory.create({
      userId,
      userFoodHistoryList
    });
    return res.status(201).json({
      message: "History added",
      history: newHistory
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong..."
    });
  }
};
exports.addNewHistory = addNewHistory;
const editNewHistory = async (req, res) => {
  const {
    userId,
    userFoodHistoryList,
    selectedDate
  } = req.body;
  console.log("userFoodHistoryList", selectedDate);
  const isUserIdValid = (0, _helpers.decodeTokenAndGetUserId)(req, userId);
  try {
    if (!isUserIdValid) {
      return res.status(403).json({
        message: "Not authorized"
      });
    }
    const newHistory = await _models.UserFoodHistory.findOneAndUpdate({
      userId,
      "userFoodHistoryList.selectedDate": selectedDate
    }, {
      userFoodHistoryList
    }, {
      new: true
    });
    return res.status(201).json({
      message: "History edited",
      history: newHistory
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong..."
    });
  }
};
exports.editNewHistory = editNewHistory;
const deleteNewHistory = async (req, res) => {
  const {
    userId,
    historyId
  } = req.body;
  const isUserIdValid = (0, _helpers.decodeTokenAndGetUserId)(req, userId);
  try {
    if (!isUserIdValid) {
      return res.status(403).json({
        message: "Not authorized"
      });
    }
    await _models.UserFoodHistory.deleteOne({
      userId,
      _id: historyId
    });
    return res.status(200).json({
      message: "History deleted"
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong..."
    });
  }
};
exports.deleteNewHistory = deleteNewHistory;