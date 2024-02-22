import express from "express"
import {
  createNewTag,
  createTag,
  deleteTags,
  editNewTag,
  editTag,
  getAllNewTags,
  getTags,
  hideNewTag,
} from "controllers"
import { authMiddleware } from "middlewares"

const router = express.Router()

router.post("/create", authMiddleware, createTag)
router.post("/get", authMiddleware, getTags)
router.patch("/edit", authMiddleware, editTag)
router.delete("/delete", authMiddleware, deleteTags)

//new routes

router.get("/all-new-tags/:userId", authMiddleware, getAllNewTags)
router.post("/add-new-tag", authMiddleware, createNewTag)
router.post("/hide-new-tag", authMiddleware, hideNewTag)
router.post("/edit-new-tag-name", authMiddleware, editNewTag)
export default router
