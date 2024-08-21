import express from "express"
const router = express.Router()
import { authMiddleware } from "middlewares"
import {
  getAllStatistics,
  getStatisticsBetweenDates,
  getWeightStatistics,
} from "../controllers/statistics-controller"

router.get("/all-stats/:userId", authMiddleware, getAllStatistics)
router.get("/weight-stats/:userId", authMiddleware, getWeightStatistics)
router.get(
  "/weight-stats/:userId/:startDate/:endDate",
  authMiddleware,
  getStatisticsBetweenDates,
)

export default router
