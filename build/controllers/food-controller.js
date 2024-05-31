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
    var _text$candidates$, _text$candidates$$con, _text$candidates$$con2, _text$candidates$$con3, _text$candidates$$con4;
    const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GENERATIVE_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: `{
          "contents": [
            {
              "role": "user",
              "parts": [
                {
                  "text": "You are a nutrition analysis assistant. Your role involves using the analyze_nutritional_value function to analyze the nutritional value of the following product(s) and return the result as an array of JSON objects, each containing the following keys: name, type, calories, protein, fat, carbs, water, serving, and weight. Here are the products: ${obj}"
                }
              ]
            }
          ],
          "tools": [
            {
              "function_declarations": [
                {
                  "name": "analyze_nutritional_value",
                  "description": "Analyze the nutritional value of one or more food or drink items from a text description and return the nutritional value per 100 grams (name, type, calories, protein, fat, carbs, water, serving, and weight) of each product as an array of JSON objects.",
                  "parameters": {
                    "type": "object",
                    "properties": {
                      "products": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "name": {
                              "type": "string",
                              "description": "Name of the food or drink item."
                            },
                            "type": {
                              "type": "string",
                              "description": "Type of the product (food or drink)."
                            },
                            "calories": {
                              "type": "string",
                              "description": "Calories per 100 grams of the product."
                            },
                            "protein": {
                              "type": "string",
                              "description": "Protein content per 100 grams of the product."
                            },
                            "fat": {
                              "type": "string",
                              "description": "Fat content per 100 grams of the product."
                            },
                            "carbs": {
                              "type": "string",
                              "description": "Carbohydrate content per 100 grams of the product."
                            },
                            "water": {
                              "type": "string",
                              "description": "Water content per 100 grams of the product."
                            },
                            "serving": {
                              "type": "string",
                              "description": "Serving size or type."
                            },
                            "weight": {
                              "type": "string",
                              "description": "Weight of the serving."
                            }
                          },
                          "required": [
                            "name",
                            "type",
                            "calories",
                            "protein",
                            "fat",
                            "carbs",
                            "water",
                            "serving",
                            "weight"
                          ]
                        }
                      }
                    },
                    "required": ["products"]
                  }
                }
              ]
            }
          ],
          "tool_config": {
            "function_calling_config": {
              "mode": "ANY",
              "allowed_function_names": ["analyze_nutritional_value"]
            }
          }
        }`
    });
    const text = await resp.json();
    const productArr = text === null || text === void 0 ? void 0 : (_text$candidates$ = text.candidates[0]) === null || _text$candidates$ === void 0 ? void 0 : (_text$candidates$$con = _text$candidates$.content) === null || _text$candidates$$con === void 0 ? void 0 : (_text$candidates$$con2 = _text$candidates$$con.parts[0]) === null || _text$candidates$$con2 === void 0 ? void 0 : (_text$candidates$$con3 = _text$candidates$$con2.functionCall) === null || _text$candidates$$con3 === void 0 ? void 0 : (_text$candidates$$con4 = _text$candidates$$con3.args) === null || _text$candidates$$con4 === void 0 ? void 0 : _text$candidates$$con4.products;
    res.status(200).json({
      message: "Text generated",
      data: productArr
    });
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
      role: "user",
      parts: [{
        text: "You are a nutrition analysis assistant. Your role involves using the analyze_nutritional_value_from_photo function to analyze the nutritional value of the following product(s) and return the result as an array of JSON objects, each containing the following keys: name, type, calories, protein, fat, carbs, water, serving, weight, and barcode. When provided with an image of a food item, whether packaged, fresh, or as part of a meal, analyze the content and return the nutritional values normalized for a 100-gram portion. The response should identify the item or items and estimate the serving size and total weight of the serving. Format the response as plain text JSON objects with the identified name of the item as the top-level key."
      }, {
        inlineData: {
          mimeType: "image/jpeg",
          data: image
        }
      }]
    }],
    tools: [{
      function_declarations: [{
        name: "analyze_nutritional_value_from_photo",
        description: "Analyze the nutritional value of one or more food or drink items from photo data and return the nutritional value per 100 grams (name, type, calories, protein, fat, carbs, water, serving, weight, and barcode) of each product as plain text JSON objects.",
        parameters: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Name of the food or drink item."
            },
            type: {
              type: "string",
              description: "Type of the product (food or drink)."
            },
            calories: {
              type: "string",
              description: "Calories per 100 grams of the product."
            },
            protein: {
              type: "string",
              description: "Protein content per 100 grams of the product."
            },
            fat: {
              type: "string",
              description: "Fat content per 100 grams of the product."
            },
            carbs: {
              type: "string",
              description: "Carbohydrate content per 100 grams of the product."
            },
            water: {
              type: "string",
              description: "Water content per 100 grams of the product."
            },
            serving: {
              type: "string",
              description: "Serving size or type."
            },
            weight: {
              type: "string",
              description: "Weight of the serving."
            },
            barcode: {
              type: "string",
              description: "Barcode number if present, or 'Not Found'."
            }
          },
          required: ["name", "type", "calories", "protein", "fat", "carbs", "water", "serving", "weight", "barcode"]
        }
      }]
    }],
    tool_config: {
      function_calling_config: {
        mode: "ANY",
        allowed_function_names: ["analyze_nutritional_value_from_photo"]
      }
    }
  };
  try {
    var _text$candidates$2, _text$candidates$2$co, _text$candidates$2$co2, _text$candidates$2$co3;
    const result = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${process.env.GENERATIVE_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const text = await result.json();

    // "data": {
    //   "candidates": [
    //       {
    //           "content": {
    //               "parts": [
    //                   {
    //                       "functionCall": {
    //                           "name": "analyze_nutritional_value_from_photo",
    //                           "args": {
    //                               "name": "Hamburger",
    //                               "weight": "200",
    //                               "fat": "12",
    //                               "calories": "290",
    //                               "type": "food",
    //                               "water": "45",
    //                               "barcode": "Not Found",
    //                               "serving": "1 burger",
    //                               "carbs": "35",
    //                               "protein": "20"
    //                           }
    //                       }
    //                   }
    //               ],
    //               "role": "model"
    //           },
    //           "finishReason": "STOP",
    //           "index": 0,
    //           "safetyRatings": [
    //               {
    //                   "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
    //                   "probability": "NEGLIGIBLE"
    //               },
    //               {
    //                   "category": "HARM_CATEGORY_HARASSMENT",
    //                   "probability": "NEGLIGIBLE"
    //               },
    //               {
    //                   "category": "HARM_CATEGORY_HATE_SPEECH",
    //                   "probability": "NEGLIGIBLE"
    //               },
    //               {
    //                   "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    //                   "probability": "NEGLIGIBLE"
    //               }
    //           ]
    //       }
    //   ],
    //   "usageMetadata": {
    //       "promptTokenCount": 699,
    //       "candidatesTokenCount": 77,
    //       "totalTokenCount": 776
    //   }

    const outputString = text === null || text === void 0 ? void 0 : (_text$candidates$2 = text.candidates[0]) === null || _text$candidates$2 === void 0 ? void 0 : (_text$candidates$2$co = _text$candidates$2.content) === null || _text$candidates$2$co === void 0 ? void 0 : (_text$candidates$2$co2 = _text$candidates$2$co.parts[0]) === null || _text$candidates$2$co2 === void 0 ? void 0 : (_text$candidates$2$co3 = _text$candidates$2$co2.functionCall) === null || _text$candidates$2$co3 === void 0 ? void 0 : _text$candidates$2$co3.args;

    // const outputString = text?.candidates[0]?.content?.parts[0]?.text

    // if (outputString) {
    //   let str

    //   str = outputString?.replace(/(\w+):/g, '"$1":')
    //   str = str?.replace(/: ([\w\s\d.]+)\b/g, ': "$1"')
    //   //const parsed = JSON.parse(outputString.trim())
    //   str = str?.replace(/\n/g, "")

    //   if (str?.charAt(0) === '"') {
    //     str = str?.slice(1)
    //   }

    //   if (str?.charAt(str?.length - 1) === '"') {
    //     str = str?.slice(0, -1)
    //   }

    //   let trimmed = str?.trim()

    //   let parsed = JSON.parse(trimmed)

    //   if (typeof parsed === "object" && !Array.isArray(parsed)) {
    //     let arr = [parsed]
    res.status(200).json({
      message: "Text generated",
      data: [outputString]
    });
    // } else {
    //   res.status(200).json({ message: "Text generated", data: parsed })
    // }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error
    });
  }
};
exports.generateImage = generateImage;