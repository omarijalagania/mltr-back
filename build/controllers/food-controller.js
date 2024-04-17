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
    image,
    prompt
  } = req.body;
  const testPrompt = "When provided with a text description of either a single food or drink item or a meal, analyze the description and return the nutritional value per 100 grams of the product(s). The response format should directly correspond to the number of products described.         Text description: Pepsi         Guidelines:         1. Single Product Description:         - Example Text Description: “Pepsi”         - Expected Response Format for a Single Product:         - A single JSON object detailing the nutritional information per 100 grams of the product.         - Example Structure for “Pepsi”:         {           name:Pepsi,           type: drink,           calories: 42 kcal,           protein: 0 g,           fat: 0 g,           carbs: 11 g,           water: 89 g,           serving: Can,           weight: 330 g         }         2. Group of Products (Meal) Description:         - Example Text Description: “Meal consisting of a cheeseburger, small fries, and a soda”         - Expected Response Format for Multiple Products (Meal):         - A single JSON object containing nested JSON objects for each item in the meal, with each item’s nutritional details per 100 grams.         - Example Structure for a Meal:         [            {               name:Cheeseburger,               type:food,               calories:250 kcal,               protein:15 g,               fat:10 g,               carbs:20 g,               water:50 g,               serving:Burger,               weight:150 g            },            {               name:Fries,               type:food,               calories:300 kcal,               protein:3 g,               fat:15 g,               carbs:40 g,               water:40 g,               serving:Small portion,               weight:70 g            },            {               name:Soda,               type:drink,               calories:42 kcal,               protein:0 g,               fat:0 g,               carbs:11 g,               water:89 g,               serving:Can,               weight:330 g            }         ]         The response must be in plain text JSON format only, explicitly excluding any Markdown, code block syntax (```), introductory text, or formatting symbols. All nutritional values are to be provided per 100 grams of the product. Ensure that the output strictly adheres to the described structure, making it suitable for direct parsing in applications.";
  const data = {
    contents: [{
      parts: [{
        text: testPrompt
      }, {
        inlineData: {
          mimeType: "image/jpeg",
          data: image.replace(/^data:image\/jpeg;base64,/, "")
        }
      }]
    }]
  };
  try {
    // const result = await model2.generateContent(JSON.stringify([prompt, part]))
    // const response = await result.response
    // const text = await response.text()

    const result = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=${process.env.GENERATIVE_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const text = await result.json();
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