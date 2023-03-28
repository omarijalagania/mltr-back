import express from "express"
import {
  confirmDeactivationCode,
  deactivateAccount,
  loginWithoutCode,
  userLogin,
  userRegister,
} from "controllers"
import { authMiddleware } from "middlewares"

const router = express.Router()

//Google - Apple auth route

router.post("/google-apple-login", loginWithoutCode)

//Email & Password

router.post("/login", userLogin)
router.post("/register", userRegister)
router.post("/deactivate-account", authMiddleware, deactivateAccount)
router.post(
  "/confirm-deactivate-account",
  authMiddleware,
  confirmDeactivationCode,
)

export default router
