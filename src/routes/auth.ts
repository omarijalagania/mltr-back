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
  getUser,
  userBuyPro,
  getUserDetails,
  getAllUsers,
  bulkEmailSend,
  testFunc,
  adminUserUpdate,
  getUserDetailsAdmin,
} from "controllers"
import { authMiddleware } from "middlewares"
import { isAdmin } from "middlewares/auth-middleware"
import { getAllEmailTemplates } from "controllers/email-templates-controller"

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
router.get("/get-user", authMiddleware, getUser)
router.get("/user-details/:userId", authMiddleware, getUserDetails)

//Pro

router.post("/pro", authMiddleware, userBuyPro)

//Token verify

router.get("/verify", tokenVerify)

//Admin routes
router.get("/admin/users", authMiddleware, isAdmin, getAllUsers)
router.post("/admin/send-emails", authMiddleware, isAdmin, bulkEmailSend)
router.get(
  "/admin/user-details/:userId",
  authMiddleware,
  isAdmin,
  getUserDetailsAdmin,
)
router.post("/admin/update-user", authMiddleware, isAdmin, adminUserUpdate)

router.get("/admin/test", testFunc)

router.get(
  "/admin/email-templates",
  authMiddleware,
  isAdmin,
  getAllEmailTemplates,
)

export default router
