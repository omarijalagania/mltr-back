import express from "express"
import {
  createHistory,
  deleteHistory,
  editHistory,
  getHistory,
} from "controllers"
import { authMiddleware } from "middlewares"

const router = express.Router()

router.post("/add", authMiddleware, createHistory)
router.post("/fetch", authMiddleware, getHistory)
router.patch("/patch", authMiddleware, editHistory)
router.delete("/remove", authMiddleware, deleteHistory)

export default router
