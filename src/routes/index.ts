import express from "express"
import authRoute from "./auth"
import tagRoute from "./tag"

const router = express.Router()

router.use(authRoute)
router.use(tagRoute)

export default router
