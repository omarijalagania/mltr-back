import dotenv from "dotenv"
dotenv.config()
import { Request, Response } from "express"
import { decodeTokenAndGetUserId } from "helpers"
import { UserFoodList } from "models"
import mongoose from "mongoose"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GENERATIVE_API_KEY as string)
const model = genAI.getGenerativeModel({ model: "gemini-pro" })

export const getAllFoods = async (req: Request, res: Response) => {
  const { userId } = req.query

  const isUserIdValid = decodeTokenAndGetUserId(req, userId as string)

  try {
    if (!isUserIdValid) {
      return res.status(403).json({ message: "Not authorized" })
    }

    const userFoodList = await UserFoodList.findOne(
      { userId },
      { userFoodList: 1, userId: 1 },
    )
    res.status(200).json(userFoodList)
  } catch (error) {
    res.status(500).json({ message: "Internal server error" })
  }
}

export const addFood = async (req: Request, res: Response) => {
  const { userId, food } = req.body

  const convertedUserId = new mongoose.Types.ObjectId(userId)

  const isUserIdValid = decodeTokenAndGetUserId(req, userId)

  try {
    if (!isUserIdValid) {
      return res.status(403).json({ message: "Not authorized" })
    }

    const user = await UserFoodList.findOne({ userId: convertedUserId })

    if (user) {
      const userFoodList = await UserFoodList.findOneAndUpdate(
        { userId: convertedUserId },
        { $push: { userFoodList: food } },
        { new: true },
      )
      return res.status(200).json(userFoodList)
    }

    const userFood = await UserFoodList.create({
      userId: convertedUserId,
      userFoodList: [food],
    })
    res.status(200).json(userFood)
  } catch (error) {
    res.status(500).json({ message: "Internal server error" })
  }
}

export const removeFood = async (req: Request, res: Response) => {
  const { userId, foodId, recipeId } = req.body

  const isUserIdValid = decodeTokenAndGetUserId(req, userId)

  try {
    if (!isUserIdValid) {
      return res.status(403).json({ message: "Not authorized" })
    }

    if (recipeId) {
      await UserFoodList.updateOne(
        { userId, "userFoodList._id": foodId },
        { $pull: { "userFoodList.$.foodList": { _id: recipeId } } },
      )

      return res.status(200).json({ message: "Recipe removed" })
    }

    await UserFoodList.updateOne(
      { userId, "userFoodList._id": foodId }, // find a document with userId and foodId
      { "userFoodList.$.isRemoved": true }, // set isRemoved to true
    )

    res.status(200).json({ message: "Food removed" })
  } catch (error) {
    res.status(500).json({ message: "Internal server error" })
  }
}

export const updateFood = async (req: Request, res: Response) => {
  const { userId, foodId, food, foodList } = req.body

  const isUserIdValid = decodeTokenAndGetUserId(req, userId)

  const updatedProperties = {} as { [key: string]: any }
  for (const key in food) {
    if (food.hasOwnProperty(key)) {
      updatedProperties[`userFoodList.$.${key}`] = food[key]
    }
  }

  try {
    if (!isUserIdValid) {
      return res.status(403).json({ message: "Not authorized" })
    }

    await UserFoodList.findOneAndUpdate(
      { userId, "userFoodList._id": foodId },
      {
        $set: {
          ...updatedProperties,
          "userFoodList.$.foodList": foodList,
        },
      },
      { new: true },
    )

    return res.status(200).json({ message: "Food updated" })
  } catch (error) {
    res.status(500).json({ message: "Internal server error" })
  }
}

export const generateText = async (req: Request, res: Response) => {
  const { obj } = req.body

  try {
    const resp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GENERATIVE_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
        }`,
      },
    )

    const text = await resp.json()

    const productArr =
      text?.candidates[0]?.content?.parts[0]?.functionCall?.args?.products

    res.status(200).json({ message: "Text generated", data: productArr })
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error })
  }
}

// Generate image

export const generateImage = async (req: Request, res: Response) => {
  const { image, prompt } = req.body

  const testPrompt =
    "When provided with a text description of either a single food or drink item or a meal, analyze the description and return the nutritional value per 100 grams of the product(s). The response format should directly correspond to the number of products described.         Text description: Pepsi         Guidelines:         1. Single Product Description:         - Example Text Description: “Pepsi”         - Expected Response Format for a Single Product:         - A single JSON object detailing the nutritional information per 100 grams of the product.         - Example Structure for “Pepsi”:         {           name:Pepsi,           type: drink,           calories: 42 kcal,           protein: 0 g,           fat: 0 g,           carbs: 11 g,           water: 89 g,           serving: Can,           weight: 330 g         }         2. Group of Products (Meal) Description:         - Example Text Description: “Meal consisting of a cheeseburger, small fries, and a soda”         - Expected Response Format for Multiple Products (Meal):         - A single JSON object containing nested JSON objects for each item in the meal, with each item’s nutritional details per 100 grams.         - Example Structure for a Meal:         [            {               name:Cheeseburger,               type:food,               calories:250 kcal,               protein:15 g,               fat:10 g,               carbs:20 g,               water:50 g,               serving:Burger,               weight:150 g            },            {               name:Fries,               type:food,               calories:300 kcal,               protein:3 g,               fat:15 g,               carbs:40 g,               water:40 g,               serving:Small portion,               weight:70 g            },            {               name:Soda,               type:drink,               calories:42 kcal,               protein:0 g,               fat:0 g,               carbs:11 g,               water:89 g,               serving:Can,               weight:330 g            }         ]         The response must be in plain text JSON format only, explicitly excluding any Markdown, code block syntax (```), introductory text, or formatting symbols. All nutritional values are to be provided per 100 grams of the product. Ensure that the output strictly adheres to the described structure, making it suitable for direct parsing in applications."

  const data = {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: "You are a nutrition analysis assistant. Your role involves using the analyze_nutritional_value_from_photo function to analyze the nutritional value of the following product(s) and return the result as an array of JSON objects, each containing the following keys: name, type, calories, protein, fat, carbs, water, serving, weight, and barcode. When provided with an image of a food item, whether packaged, fresh, or as part of a meal, analyze the content and return the nutritional values normalized for a 100-gram portion. The response should identify the item or items and estimate the serving size and total weight of the serving. Format the response as plain text JSON objects with the identified name of the item as the top-level key.",
          },
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: image,
            },
          },
        ],
      },
    ],
    tools: [
      {
        function_declarations: [
          {
            name: "analyze_nutritional_value_from_photo",
            description:
              "Analyze the nutritional value of one or more food or drink items from photo data and return the nutritional value per 100 grams (name, type, calories, protein, fat, carbs, water, serving, weight, and barcode) of each product as plain text JSON objects.",
            parameters: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  description: "Name of the food or drink item.",
                },
                type: {
                  type: "string",
                  description: "Type of the product (food or drink).",
                },
                calories: {
                  type: "string",
                  description: "Calories per 100 grams of the product.",
                },
                protein: {
                  type: "string",
                  description: "Protein content per 100 grams of the product.",
                },
                fat: {
                  type: "string",
                  description: "Fat content per 100 grams of the product.",
                },
                carbs: {
                  type: "string",
                  description:
                    "Carbohydrate content per 100 grams of the product.",
                },
                water: {
                  type: "string",
                  description: "Water content per 100 grams of the product.",
                },
                serving: {
                  type: "string",
                  description: "Serving size or type.",
                },
                weight: {
                  type: "string",
                  description: "Weight of the serving.",
                },
                barcode: {
                  type: "string",
                  description: "Barcode number if present, or 'Not Found'.",
                },
              },
              required: [
                "name",
                "type",
                "calories",
                "protein",
                "fat",
                "carbs",
                "water",
                "serving",
                "weight",
                "barcode",
              ],
            },
          },
        ],
      },
    ],
    tool_config: {
      function_calling_config: {
        mode: "ANY",
        allowed_function_names: ["analyze_nutritional_value_from_photo"],
      },
    },
  }

  try {
    const result = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${process.env.GENERATIVE_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    )

    const text = await result.json()

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

    const outputString =
      text?.candidates[0]?.content?.parts[0]?.functionCall?.args

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
    res.status(200).json({ message: "Text generated", data: [outputString] })
    // } else {
    //   res.status(200).json({ message: "Text generated", data: parsed })
    // }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error })
  }
}
