import express from "express"
import { createTag, deleteTags, editTag, getTags } from "controllers"
import { authMiddleware } from "middlewares"

const router = express.Router()

router.post("/create", authMiddleware, createTag)
router.post("/get", authMiddleware, getTags)
router.patch("/edit", authMiddleware, editTag)
router.delete("/delete", authMiddleware, deleteTags)
export default router
