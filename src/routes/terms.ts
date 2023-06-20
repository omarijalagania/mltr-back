import express from "express"
import { termsOfService } from "controllers"

const router = express.Router()

router.get("/terms", termsOfService)

export default router
