import express from "express"
import {
  confirmDeactivationCode,
  deactivateAccount,
  registerWithApple,
  getConfirmationCode,
  userLogin,
  userRegister,
  registerWithGoogle,
  loginWithGoogle,
  loginWithApple,
  updateUser,
  tokenVerify,
} from "controllers"
import { authMiddleware } from "middlewares"

const router = express.Router()

// Google - auth route
router.post("/google-register", registerWithGoogle)
router.post("/google-login", loginWithGoogle)

// Apple - auth route

router.post("/apple-register", registerWithApple)
router.post("/apple-login", loginWithApple)

// Email & Password

router.post("/login", userLogin)
router.post("/register", userRegister)
router.post("/get-code", getConfirmationCode)
router.post("/deactivate-account", authMiddleware, deactivateAccount)
router.post(
  "/confirm-deactivate-account",
  authMiddleware,
  confirmDeactivationCode,
)
router.patch("/update-user", authMiddleware, updateUser)

//Token verify

router.get("/verify", tokenVerify)

export default router
