import express from "express"
const router = express.Router()
import { authMiddleware } from "middlewares"
import { addUserWeight, getUserWeight, updateUserWeight } from "../controllers"

router.post("/user-weight", authMiddleware, addUserWeight)
router.get("/user-weight/:userId", authMiddleware, getUserWeight)
router.patch("/user-weight", authMiddleware, updateUserWeight)

export default router
