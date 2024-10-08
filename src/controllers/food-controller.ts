import dotenv from "dotenv"
dotenv.config()
import { Request, Response } from "express"
import { convertArgumentsToJSON, decodeTokenAndGetUserId } from "helpers"
import { UserFoodList } from "models"
import mongoose from "mongoose"

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
      // Update the user's food list by adding each item in the array
      const userFoodList = await UserFoodList.findOneAndUpdate(
        { userId: convertedUserId },
        { $push: { userFoodList: { $each: food } } }, // Use $each to push all items in the array
        { new: true },
      )
      return res.status(200).json(userFoodList)
    }

    // If user does not exist, create a new entry with the food array
    const userFood = await UserFoodList.create({
      userId: convertedUserId,
      userFoodList: food, // Directly assign the array to userFoodList
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
      const removedFood = await UserFoodList.updateOne(
        { userId, "userFoodList._id": foodId },
        { $pull: { "userFoodList.$.foodList": { _id: recipeId } } },
      )

      return res.status(200).json({ message: "Recipe removed", removedFood })
    }

    await UserFoodList.updateOne(
      { userId: userId, "userFoodList._id": foodId }, // find a document with userId and foodId
      { "userFoodList.$.isRemoved": true }, // set isRemoved to true
    )

    res.status(200).json({ message: "Food removed" })
  } catch (error) {
    res.status(500).json({ message: "Internal server error" })
  }
}

export const removeAllFoods = async (req: Request, res: Response) => {
  const { userId } = req.body

  const isUserIdValid = decodeTokenAndGetUserId(req, userId)

  try {
    if (!isUserIdValid) {
      return res.status(403).json({ message: "Not authorized" })
    }

    const removedFood = await UserFoodList.updateOne(
      { userId },
      { $set: { userFoodList: [] } },
    )

    res.status(200).json({ message: "All foods removed", removedFood })
  } catch (error) {
    res.status(500).json({ message: "Internal server error" })
  }
}

export const updateFood = async (req: Request, res: Response) => {
  const { userId, foodId, food } = req.body

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

    const updatedFood = await UserFoodList.findOneAndUpdate(
      { userId: userId, "userFoodList._id": foodId },
      {
        $set: {
          ...updatedProperties,
        },
      },
      { new: true },
    )

    return res.status(200).json({ message: "Food updated", updatedFood })
  } catch (error) {
    res.status(500).json({ message: "Internal server error" })
  }
}

export const generateText = async (req: Request, res: Response) => {
  const { obj } = req.body

  function convertTextToObject(text: string) {
    // Extract the JSON string using a regular expression
    const jsonStringMatch = text.match(/```json\n([\s\S]*?)\n```/)

    if (!jsonStringMatch || jsonStringMatch.length < 2) {
      throw new Error("Invalid input format")
    }

    const jsonString = jsonStringMatch[1]

    // Parse the JSON string into an object
    const jsonObject = JSON.parse(jsonString)

    return jsonObject
  }

  function convertObjectToArray(data: any) {
    return Object.entries(data).map(([name, details]) => ({
      name,
      //@ts-ignore
      ...details,
    }))
  }

  function stringifyValues(obj: any): any {
    if (typeof obj !== "object" || obj === null) {
      return String(obj)
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => stringifyValues(item))
    }

    return Object.keys(obj).reduce((acc, key) => {
      acc[key] = stringifyValues(obj[key])
      return acc
    }, {} as any)
  }

  try {
    const resp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GENERATIVE_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: `{
      "contents": [{
        "parts":[{"text": "You are a nutrition analysis assistant. Your role involves  analyze the nutritional value of the following product(s) and return the result object, each containing the following keys: name, type, calories, protein, fat, carbs, water, serving, and weight. example structure: Pepsi: { type: drink, calories: 42 kcal, protein: 0 g, fat: 0 g, carbs: 11 g, water: 89 g, serving: Can,weight: 330 g } do not return text. Here are the products: ${obj}"}]
        }]
       }`,
      },
    )

    const text = await resp.json()

    const productArr = text?.candidates[0]?.content?.parts[0]?.text

    const converted = convertTextToObject(productArr)

    const arr = convertObjectToArray(converted)

    const stringified = stringifyValues(arr)

    res.status(200).json({ message: "Text generated", data: stringified })
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error })
  }
}

export const generateImage = async (req: Request, res: Response) => {
  const { image } = req.body

  const data = {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: "You are a nutrition analysis assistant. Your role involves using the analyze_nutritional_value_from_photo function to analyze the nutritional value of the following product(s) and return the result as an array of JSON objects, each containing the following keys: name, type, calories, protein, fat, carbs, water, serving, and weight. When provided with an image of a food item, whether packaged, fresh, or as part of a meal, analyze the content and return the nutritional values normalized for a 100-gram portion. The response should identify the item or items and estimate the serving size and total weight of the serving. The serving parameter should reflect the quantity and size seen in the photo (e.g., '5 medium apples' if there are 5 apples, '1 large burger' if there is one large burger). The weight should be the total weight for the quantity observed. Format the response as plain text JSON objects with the identified name of the item as the top-level key.",
          },
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: image.replace(/^data:image\/jpeg;base64,/, ""),
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
              "Analyze the nutritional value of one or more food or drink items from photo data and return the nutritional value per 100 grams (name, type, calories, protein, fat, carbs, water, serving, and weight) of each product as plain text JSON objects.",
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
                  description:
                    "Serving size or type based on the quantity and size observed in the photo.",
                },
                weight: {
                  type: "string",
                  description:
                    "Total weight of the serving based on the quantity and size observed in the photo.",
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

    const outputString = text?.candidates[0]?.content?.parts?.map(
      (item: any) => item?.functionCall?.args,
    )

    res.status(200).json({ message: "Text generated", data: outputString })
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error })
  }
}

export const generateTextFromImageGPT = async (req: Request, res: Response) => {
  const { image } = req.body

  try {
    const data = {
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are a nutrition analysis assistant. Your role is to analyze the nutritional value of all food and drink items in a given image. Each item should be analyzed separately, and the results should be returned as an array of JSON objects.",
        },
        {
          role: "system",
          content:
            "Each JSON object should contain the following keys: name, type, calories, protein, fat, carbs, water, serving, and weight. The nutritional values should be normalized for a 100-gram portion.",
        },
        {
          role: "system",
          content:
            "When provided with an image of one or multiple food items, whether packaged, fresh, or as part of a meal, identify and analyze each item separately. Ensure that the response includes separate JSON objects for each recognized item in the image. For each item, correctly identify the quantity and size of items (e.g., '4 medium tomatoes'). The serving parameter should reflect the quantity and type of items seen in the photo, and the weight should reflect the total weight for the serving size in the photo.",
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze the nutritional value of these food items.",
            },

            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${image}`,
              },
            },
          ],
        },
      ],
      functions: [
        {
          name: "analyze_nutritional_value_from_photo",
          description:
            "Analyze the nutritional value of multiple food or drink items from photo data. Return the nutritional value per 100 grams for each item in the image. The response should be an array of JSON objects, each containing: name, type, calories, protein, fat, carbs, water, serving, and weight. Each item must be analyzed and returned as a separate JSON object.",
          parameters: {
            type: "object",
            properties: {
              items: {
                type: "array",
                items: {
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
                      description:
                        "Protein content per 100 grams of the product.",
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
                      description:
                        "Water content per 100 grams of the product.",
                    },
                    serving: {
                      type: "string",
                      description:
                        "Serving size or type. Reflects the quantity and size of items in the photo.",
                    },
                    weight: {
                      type: "string",
                      description:
                        "Weight of the serving. Reflects the total weight for the serving size in the photo.",
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
                  ],
                },
              },
            },
            required: ["items"],
          },
        },
      ],
      function_call: {
        name: "analyze_nutritional_value_from_photo",
      },
    }

    const result = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify(data),
    })

    const text = await result.json()

    if (text?.error?.message) {
      return res
        .status(500)
        .json({ message: "Internal server error", error: text.error.message })
    }

    if (text) {
      const outPut = convertArgumentsToJSON(
        text?.choices[0]?.message?.function_call?.arguments,
      )

      const arr = outPut?.items
      res.status(200).json({ message: "Text generated", data: arr })
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error })
  }
}

export const gptCorrection = async (req: Request, res: Response) => {
  const { userInput, original_response_as_a_string } = req.body

  try {
    const data = {
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are a nutrition analysis assistant. Your role is to analyze and adjust the nutritional value of all food and drink items based on user corrections. Each item should be analyzed separately, and the results should be returned as an array of JSON objects.",
        },
        {
          role: "system",
          content:
            "Each JSON object should contain the following keys: name, type, calories, protein, fat, carbs, water, serving, and weight. The nutritional values should be normalized for a 100-gram portion.",
        },
        {
          role: "system",
          content:
            "When provided with correction details for one or multiple food items, update the nutritional values accordingly. Ensure that the response includes separate JSON objects for each corrected item, and make sure to adjust all relevant nutritional values based on the user's input. If the name of the food item is changed, regenerate the nutritional values based on the new name. The serving parameter should reflect the updated quantity and type of items as per the user input, and the weight should reflect the total weight for the updated serving size.",
        },
        {
          role: "system",
          content: `Here is the original response: ${original_response_as_a_string}`,
        },
        {
          role: "user",
          content: `Here are the correction details: ${userInput}`,
        },
      ],
      functions: [
        {
          name: "adjust_nutritional_value",
          description:
            "Adjust the nutritional value of multiple food or drink items based on user corrections. Return the corrected nutritional value per 100 grams for each item. The response should be an array of JSON objects, each containing: name, type, calories, protein, fat, carbs, water, serving, and weight. Each corrected item must be analyzed and returned as a separate JSON object with updated values based on user input. If the name of the food item is changed, regenerate the nutritional values based on the new name.",
          parameters: {
            type: "object",
            properties: {
              corrections_response: {
                type: "array",
                items: {
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
                      description:
                        "Protein content per 100 grams of the product.",
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
                      description:
                        "Water content per 100 grams of the product.",
                    },
                    serving: {
                      type: "string",
                      description:
                        "Serving size or type. Reflects the quantity and size of items in the corrected analysis.",
                    },
                    weight: {
                      type: "string",
                      description:
                        "Weight of the serving. Reflects the total weight for the corrected serving size.",
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
                  ],
                },
              },
              user_input: {
                type: "string",
                description:
                  "User-provided description of the issues and corrections for the original analysis.",
              },
            },
            required: ["corrections_response"],
          },
        },
      ],
      function_call: {
        name: "adjust_nutritional_value",
      },
    }

    const result = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify(data),
    })

    const text = await result.json()

    if (text?.error?.message) {
      return res
        .status(500)
        .json({ message: "Internal server error", error: text.error.message })
    }

    res.status(200).json({ message: "Text generated", data: text })
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error })
  }
}

export const getSingleFood = async (req: Request, res: Response) => {
  const { userId, foodId } = req.body

  const isUserIdValid = decodeTokenAndGetUserId(req, userId as string)

  try {
    if (!isUserIdValid) {
      return res.status(403).json({ message: "Not authorized" })
    }

    const userFoodList = await UserFoodList.findOne(
      { userId, "userFoodList._id": foodId },
      { "userFoodList.$": 1 },
    )

    if (!userFoodList) {
      return res.status(404).json({ message: "Food not found" })
    }
    res.status(200).json(userFoodList)
  } catch (error) {
    res.status(500).json({ message: "Internal server error" })
  }
}

export const generateTextGpt = async (req: Request, res: Response) => {
  const { text } = req.body

  const data = {
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content:
          "You are a nutrition analysis assistant. Your role is to analyze the nutritional value of all food and drink items based on their names provided as text. Each item should be analyzed separately, and the results should be returned as an array of JSON objects.",
      },
      {
        role: "system",
        content:
          "Each JSON object should contain the following keys: name, type, calories, protein, fat, carbs, water, serving, and weight. The nutritional values should be normalized for a 100-gram portion.",
      },
      {
        role: "system",
        content:
          "When provided with the name of one or multiple food items, identify and analyze each item separately. Ensure that the response includes separate JSON objects for each recognized item in the text. For each item, correctly identify the quantity and size of items (e.g., '4 medium tomatoes'). The serving parameter should reflect the quantity and type of items described in the text, and the weight should reflect the total weight for the serving size specified in the text.",
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Analyze the nutritional value of these food items: ${text}`,
          },
        ],
      },
    ],
    functions: [
      {
        name: "analyze_nutritional_value_from_text",
        description:
          "Analyze the nutritional value of multiple food or drink items based on their names provided as text. Return the nutritional value per 100 grams for each item. The response should be an array of JSON objects, each containing: name, type, calories, protein, fat, carbs, water, serving, and weight. Each item must be analyzed and returned as a separate JSON object.",
        parameters: {
          type: "object",
          properties: {
            items: {
              type: "array",
              items: {
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
                    type: "integer",
                    description: "Calories per 100 grams of the product.",
                  },
                  protein: {
                    type: "integer",
                    description:
                      "Protein content per 100 grams of the product.",
                  },
                  fat: {
                    type: "integer",
                    description: "Fat content per 100 grams of the product.",
                  },
                  carbs: {
                    type: "integer",
                    description:
                      "Carbohydrate content per 100 grams of the product.",
                  },
                  water: {
                    type: "integer",
                    description: "Water content per 100 grams of the product.",
                  },
                  serving: {
                    type: "string",
                    description:
                      "Serving size or type. Reflects the quantity and size of items described in the text.",
                  },
                  weight: {
                    type: "integer",
                    description:
                      "Weight of the serving. Reflects the total weight for the serving size described in the text.",
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
                ],
              },
            },
          },
          required: ["items"],
        },
      },
    ],
    function_call: {
      name: "analyze_nutritional_value_from_text",
    },
  }

  try {
    const result = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify(data),
    })

    const dataRes = await result.json()

    if (dataRes?.error?.message) {
      return res.status(500).json({
        message: "Internal server error",
        error: dataRes.error.message,
      })
    }

    if (dataRes) {
      const outPut = convertArgumentsToJSON(
        dataRes?.choices[0]?.message?.function_call?.arguments,
      )
      const arr = outPut?.items
      res.status(200).json({ message: "Text generated", data: arr })
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error })
  }
}
