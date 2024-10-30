import {
  createBugReport,
  deleteBugReport,
  editBugReport,
  getBugById,
  getBugReports,
  getEmailSendLogById,
  getEmailSendLogs,
  getUsersByCountry,
  recordEmailSendLog,
  recordSubscription,
} from "controllers"
import express from "express"
const router = express.Router()
import { authMiddleware } from "middlewares"
import { isAdmin } from "middlewares/auth-middleware"

router.post(
  "/admin/send-email-log",
  authMiddleware,
  isAdmin,
  recordEmailSendLog,
)

router.get("/admin/get-email-logs", authMiddleware, isAdmin, getEmailSendLogs)
router.get(
  "/admin/get-email-detail-logs/:id",
  authMiddleware,
  isAdmin,
  getEmailSendLogById,
)

// Bugs

router.post("/admin/bug/create", authMiddleware, isAdmin, createBugReport)
router.get("/admin/bug/get-all", authMiddleware, isAdmin, getBugReports)
router.get("/admin/bug/get/:id", authMiddleware, isAdmin, getBugById)
router.patch("/admin/bug/update/:id", authMiddleware, isAdmin, editBugReport)
router.delete("/admin/bug/delete/:id", authMiddleware, isAdmin, deleteBugReport)

// non admin

router.get("/get/bug", authMiddleware, getBugReports)

// Country Statistics

router.get(
  "/admin/country-statistics",
  authMiddleware,
  isAdmin,
  getUsersByCountry,
)

//Subscription Webhook

router.post("/subscription", recordSubscription)

export default router
