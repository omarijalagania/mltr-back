import express from "express"
const router = express.Router()
import { authMiddleware } from "middlewares"
import { getAllStatistics } from "../controllers/statistics-controller"

router.get("/all-stats/:userId", authMiddleware, getAllStatistics)

export default router
