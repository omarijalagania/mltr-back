import express from "express"
import {
  confirmDeactivationCode,
  deactivateAccount,
  getUser,
  googleAuthMiddleware,
  googleFallbackMiddleware,
  logOut,
  userLogin,
  userRegister,
} from "controllers"

const router = express.Router()

// Google auth
router.get("/google", googleAuthMiddleware)
router.get("/google/callback", googleFallbackMiddleware)

// log out and user info
router.post("/logout", logOut)
router.get("/get-user", getUser)

//Email & Password

router.post("/register", userRegister)
router.post("/login", userLogin)
router.post("/deactivate-account", deactivateAccount)
router.post("/confirm-deactivate-account", confirmDeactivationCode)

export default router
