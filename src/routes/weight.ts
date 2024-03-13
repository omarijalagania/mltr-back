import express from "express"
const router = express.Router()
import { authMiddleware } from "middlewares"
import { addUserWeight, getUserWeight } from "../controllers"

router.post("/user-weight", authMiddleware, addUserWeight)
router.get("/user-weight/:userId", authMiddleware, getUserWeight)

export default router
