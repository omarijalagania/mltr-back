import express from "express"
const router = express.Router()
import { authMiddleware } from "middlewares"
import {
  addUserMultipleWeights,
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
router.post("/add-multiple-user-weight", authMiddleware, addUserMultipleWeights)

export default router
