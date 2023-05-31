import express from "express"
import { privacyPolicy } from "controllers"

const router = express.Router()

router.get("/privacy", privacyPolicy)

export default router
