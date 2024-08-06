import {
  addFood,
  generateImage,
  generateText,
  generateTextFromImageGPT,
  getAllFoods,
  getSingleFood,
  gptCorrection,
  removeAllFoods,
  removeFood,
  updateFood,
} from "controllers"
import express from "express"

import { authMiddleware } from "middlewares"

const router = express.Router()

router.get("/get-food", authMiddleware, getAllFoods)
router.post("/get-single-food", authMiddleware, getSingleFood)
router.post("/post-food", authMiddleware, addFood)
router.post("/delete-food", authMiddleware, removeFood)
router.post("/remove-all-food", authMiddleware, removeAllFoods)
router.patch("/update-food", authMiddleware, updateFood)

//test

router.post("/generate-text", generateText)
router.post("/generate-image", generateImage)

//Open Ai

router.post("/gpt-image", authMiddleware, generateTextFromImageGPT)
router.post("/gpt-correction", authMiddleware, gptCorrection)

export default router
