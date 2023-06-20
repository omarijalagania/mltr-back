import express from "express"
import authRoute from "./auth"
import tagRoute from "./tag"
import historyRoute from "./history"
import privacyRoute from "./privacy"
import termsRoute from "./terms"

const router = express.Router()

router.use(authRoute)
router.use(tagRoute)
router.use(historyRoute)
router.use(privacyRoute)
router.use(termsRoute)
export default router
