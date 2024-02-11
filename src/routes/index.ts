import express from "express"
import authRoute from "./auth"
import tagRoute from "./tag"
import historyRoute from "./history"
import privacyRoute from "./privacy"
import termsRoute from "./terms"
import foodRoute from "./food"

const router = express.Router()

router.use(authRoute)
router.use(tagRoute)
router.use(historyRoute)
router.use(privacyRoute)
router.use(termsRoute)
router.use(foodRoute)
export default router
