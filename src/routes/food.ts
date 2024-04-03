import {
  addFood,
  generateText,
  getAllFoods,
  removeFood,
  updateFood,
} from "controllers"
import express from "express"

import { authMiddleware } from "middlewares"

const router = express.Router()

router.get("/get-food", authMiddleware, getAllFoods)
router.post("/post-food", authMiddleware, addFood)
router.post("/delete-food", authMiddleware, removeFood)
router.patch("/update-food", authMiddleware, updateFood)

//test

router.post("/generate-text", generateText)

export default router
