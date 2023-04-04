import express from "express"
import {
  confirmDeactivationCode,
  deactivateAccount,
  loginWithoutCodeApple,
  loginWithoutCodeGoogle,
  getConfirmationCode,
  userLogin,
  userRegister,
} from "controllers"
import { authMiddleware } from "middlewares"

const router = express.Router()

//Google - auth route
router.post("/google-login", loginWithoutCodeGoogle)

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
