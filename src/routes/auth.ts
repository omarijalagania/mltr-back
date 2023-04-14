import express from "express"
import {
  confirmDeactivationCode,
  deactivateAccount,
  loginWithoutCodeApple,
  getConfirmationCode,
  userLogin,
  userRegister,
  registerWithGoogle,
} from "controllers"
import { authMiddleware } from "middlewares"

const router = express.Router()

//Google - auth route
router.post("/google-register", registerWithGoogle)

//Apple - auth route

router.post("/apple-login", loginWithoutCodeApple)

//Email & Password

router.post("/login", userLogin)
router.post("/register", userRegister)
router.post("/get-code", getConfirmationCode)
router.post("/deactivate-account", authMiddleware, deactivateAccount)
router.post(
  "/confirm-deactivate-account",
  authMiddleware,
  confirmDeactivationCode
)

export default router
