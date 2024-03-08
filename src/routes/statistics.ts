import express from "express"
const router = express.Router()
import { authMiddleware } from "middlewares"
import {
  getAllStatistics,
  getWeightStatistics,
} from "../controllers/statistics-controller"

router.get("/all-stats/:userId", authMiddleware, getAllStatistics)
router.get("/weight-stats/:userId", authMiddleware, getWeightStatistics)

export default router
