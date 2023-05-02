"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHistory = exports.editHistory = exports.deleteHistory = exports.createHistory = void 0;
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
exports.deleteHistory = deleteHistory;