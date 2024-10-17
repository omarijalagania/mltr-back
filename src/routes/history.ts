import express from "express"
import {
  addNewHistory,
  createHistory,
  deleteAllHistory,
  deleteHistory,
  deleteNewHistory,
  deleteSpecificFoodFromHistory,
  editHistory,
  editNewHistory,
  editNewHistoryParts,
  getAllHistory,
  getHistory,
} from "controllers"
import { authMiddleware } from "middlewares"

const router = express.Router()

router.post("/add", authMiddleware, createHistory)
router.post("/fetch", authMiddleware, getHistory)
router.patch("/patch", authMiddleware, editHistory)
router.delete("/remove", authMiddleware, deleteHistory)

//new routes

router.get("/all/:userId", authMiddleware, getAllHistory)
router.post("/add-new-history", authMiddleware, addNewHistory)
router.patch("/edit-new-history", authMiddleware, editNewHistory)
router.patch("/edit-new-history-part", authMiddleware, editNewHistoryParts)
router.delete(
  "/delete-new-history-part",
  authMiddleware,
  deleteSpecificFoodFromHistory,
)
router.post("/edit-new-history-part", authMiddleware, editNewHistoryParts)
router.delete("/delete-new-history", authMiddleware, deleteNewHistory)
router.post(
  "/delete-new-history-part",
  authMiddleware,
  deleteSpecificFoodFromHistory,
)
router.post("/delete-all-history", authMiddleware, deleteAllHistory)

export default router
