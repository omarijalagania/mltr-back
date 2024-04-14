"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateFood = exports.removeFood = exports.getAllFoods = exports.generateText = exports.generateImage = exports.addFood = void 0;
var _dotenv = _interopRequireDefault(require("dotenv"));
var _helpers = require("../helpers");
var _models = require("../models");
var _mongoose = _interopRequireDefault(require("mongoose"));
var _generativeAi = require("@google/generative-ai");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_dotenv.default.config();
const genAI = new _generativeAi.GoogleGenerativeAI(process.env.GENERATIVE_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-pro"
});
const model2 = genAI.getGenerativeModel({
  model: "gemini-pro"
});
const getAllFoods = async (req, res) => {
  const {
    userId
  } = req.query;
  const isUserIdValid = (0, _helpers.decodeTokenAndGetUserId)(req, userId);
  try {
    if (!isUserIdValid) {
      return res.status(403).json({
        message: "Not authorized"
      });
    }
    const userFoodList = await _models.UserFoodList.findOne({
      userId
    }, {
      userFoodList: 1,
      userId: 1
    });
    res.status(200).json(userFoodList);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error"
    });
  }
};
exports.getAllFoods = getAllFoods;
const addFood = async (req, res) => {
  const {
    userId,
    food
  } = req.body;
  const convertedUserId = new _mongoose.default.Types.ObjectId(userId);
  const isUserIdValid = (0, _helpers.decodeTokenAndGetUserId)(req, userId);
  try {
    if (!isUserIdValid) {
      return res.status(403).json({
        message: "Not authorized"
      });
    }
    const user = await _models.UserFoodList.findOne({
      userId: convertedUserId
    });
    if (user) {
      const userFoodList = await _models.UserFoodList.findOneAndUpdate({
        userId: convertedUserId
      }, {
        $push: {
          userFoodList: food
        }
      }, {
        new: true
      });
      return res.status(200).json(userFoodList);
    }
    const userFood = await _models.UserFoodList.create({
      userId: convertedUserId,
      userFoodList: [food]
    });
    res.status(200).json(userFood);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error"
    });
  }
};
exports.addFood = addFood;
const removeFood = async (req, res) => {
  const {
    userId,
    foodId,
    recipeId
  } = req.body;
  const isUserIdValid = (0, _helpers.decodeTokenAndGetUserId)(req, userId);
  try {
    if (!isUserIdValid) {
      return res.status(403).json({
        message: "Not authorized"
      });
    }
    if (recipeId) {
      await _models.UserFoodList.updateOne({
        userId,
        "userFoodList._id": foodId
      }, {
        $pull: {
          "userFoodList.$.foodList": {
            _id: recipeId
          }
        }
      });
      return res.status(200).json({
        message: "Recipe removed"
      });
    }
    await _models.UserFoodList.updateOne({
      userId,
      "userFoodList._id": foodId
    },
    // find a document with userId and foodId
    {
      "userFoodList.$.isRemoved": true
    } // set isRemoved to true
    );

    res.status(200).json({
      message: "Food removed"
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error"
    });
  }
};
exports.removeFood = removeFood;
const updateFood = async (req, res) => {
  const {
    userId,
    foodId,
    food,
    foodList
  } = req.body;
  const isUserIdValid = (0, _helpers.decodeTokenAndGetUserId)(req, userId);
  const updatedProperties = {};
  for (const key in food) {
    if (food.hasOwnProperty(key)) {
      updatedProperties[`userFoodList.$.${key}`] = food[key];
    }
  }
  try {
    if (!isUserIdValid) {
      return res.status(403).json({
        message: "Not authorized"
      });
    }
    await _models.UserFoodList.findOneAndUpdate({
      userId,
      "userFoodList._id": foodId
    }, {
      $set: {
        ...updatedProperties,
        "userFoodList.$.foodList": foodList
      }
    }, {
      new: true
    });
    return res.status(200).json({
      message: "Food updated"
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error"
    });
  }
};
exports.updateFood = updateFood;
const generateText = async (req, res) => {
  const {
    obj
  } = req.body;
  try {
    // const resp = await fetch(
    //   `https://generativelanguage.googleapis.com/v1beta3/models/text-bison-001:generateText?key=${process.env.GENERATIVE_API_KEY}`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: `{"prompt": {"text" : ${JSON.stringify(obj)}}}`,
    //   },
    // )

    const result = await model.generateContent(JSON.stringify(obj));
    const response = await result.response;
    const text = await response.text();
    if (text) {
      var _str, _str2, _str3, _str5, _str6, _str8;
      let str;
      str = text === null || text === void 0 ? void 0 : text.replace(/(\w+):/g, '"$1":');
      str = (_str = str) === null || _str === void 0 ? void 0 : _str.replace(/: ([\w\s\d.]+)\b/g, ': "$1"');
      //const parsed = JSON.parse(outputString.trim())
      str = (_str2 = str) === null || _str2 === void 0 ? void 0 : _str2.replace(/\n/g, "");
      if (((_str3 = str) === null || _str3 === void 0 ? void 0 : _str3.charAt(0)) === '"') {
        var _str4;
        str = (_str4 = str) === null || _str4 === void 0 ? void 0 : _str4.slice(1);
      }
      if (((_str5 = str) === null || _str5 === void 0 ? void 0 : _str5.charAt(((_str6 = str) === null || _str6 === void 0 ? void 0 : _str6.length) - 1)) === '"') {
        var _str7;
        str = (_str7 = str) === null || _str7 === void 0 ? void 0 : _str7.slice(0, -1);
      }
      let trimmed = (_str8 = str) === null || _str8 === void 0 ? void 0 : _str8.trim();
      let parsed = JSON.parse(trimmed);
      res.status(200).json({
        message: "Text generated",
        data: parsed
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error
    });
  }
};

// Generate image
exports.generateText = generateText;
const generateImage = async (req, res) => {
  const {
    image
  } = req.body;
  function base64ToGenerativePart(base64Image, mimeType) {
    return {
      inlineData: {
        data: base64Image,
        mimeType
      }
    };
  }
  const part = base64ToGenerativePart(image, "image/jpeg");
  const prompt = "what is on image?";
  try {
    const result = await model2.generateContent(JSON.stringify([prompt, part]));
    console.log(result);
    const response = await result.response;
    const text = await response.text();
    console.log(text);
    res.status(200).json({
      message: "Text generated",
      data: text
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error
    });
  }
};
exports.generateImage = generateImage;