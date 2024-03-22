"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUserWeight = exports.getUserWeight = exports.addUserWeight = void 0;
var _helpers = require("../helpers");
var _models = require("../models");
const addUserWeight = async (req, res) => {
  const {
    weight,
    userId,
    date
  } = req.body;
  try {
    const isValid = (0, _helpers.isValidId)(userId);
    const isUserIdValid = (0, _helpers.decodeTokenAndGetUserId)(req, userId);
    if (!isValid) {
      return res.status(422).json({
        message: "Invalid userId"
      });
    }
    if (!isUserIdValid) {
      return res.status(403).json({
        message: "Not authorized"
      });
    }
    await _models.Weight.create({
      weight,
      userId,
      date
    });
    res.status(201).json({
      message: "Weight added"
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong..."
    });
  }
};
exports.addUserWeight = addUserWeight;
const getUserWeight = async (req, res) => {
  const {
    userId
  } = req.params;
  const isValid = (0, _helpers.isValidId)(userId);
  const isUserIdValid = (0, _helpers.decodeTokenAndGetUserId)(req, userId);
  try {
    if (!isValid) {
      return res.status(422).json({
        message: "Invalid userId"
      });
    }
    if (!isUserIdValid) {
      return res.status(403).json({
        message: "Not authorized"
      });
    }
    const weights = await _models.Weight.find({
      userId
    }, {
      __v: 0
    });
    res.status(200).json(weights);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong..."
    });
  }
};
exports.getUserWeight = getUserWeight;
const updateUserWeight = async (req, res) => {
  const {
    weight,
    userId,
    date
  } = req.body;
  try {
    const isValid = (0, _helpers.isValidId)(userId);
    const isUserIdValid = (0, _helpers.decodeTokenAndGetUserId)(req, userId);
    if (!isValid) {
      return res.status(422).json({
        message: "Invalid userId"
      });
    }
    if (!isUserIdValid) {
      return res.status(403).json({
        message: "Not authorized"
      });
    }
    const updatedWeight = await _models.Weight.findOneAndUpdate({
      userId,
      date
    }, {
      weight
    });
    res.status(200).json({
      updatedWeight,
      message: "Weight updated"
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong..."
    });
  }
};
exports.updateUserWeight = updateUserWeight;