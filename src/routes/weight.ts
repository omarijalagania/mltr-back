import express from "express"
const router = express.Router()
import { authMiddleware } from "middlewares"
import {
  addUserWeight,
  deleteAllUserWeights,
  deleteSingleUserWeight,
  getUserWeight,
  updateUserWeight,
} from "../controllers"

router.post("/user-weight", authMiddleware, addUserWeight)
router.get("/user-weight/:userId", authMiddleware, getUserWeight)
router.patch("/user-weight", authMiddleware, updateUserWeight)
router.post("/delete-all-user-weights", authMiddleware, deleteAllUserWeights)
router.post(
  "/delete-single-user-weight",
  authMiddleware,
  deleteSingleUserWeight,
)

export default router
