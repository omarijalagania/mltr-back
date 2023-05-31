import express from "express"
import authRoute from "./auth"
import tagRoute from "./tag"
import historyRoute from "./history"
import privacyRoute from "./privacy"

const router = express.Router()

router.use(authRoute)
router.use(tagRoute)
router.use(historyRoute)
router.use(privacyRoute)
export default router
