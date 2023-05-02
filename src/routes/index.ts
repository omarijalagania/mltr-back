import express from "express"
import authRoute from "./auth"
import tagRoute from "./tag"
import historyRoute from "./history"

const router = express.Router()

router.use(authRoute)
router.use(tagRoute)
router.use(historyRoute)
export default router
