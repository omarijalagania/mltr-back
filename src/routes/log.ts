import {
  getEmailSendLogById,
  getEmailSendLogs,
  recordEmailSendLog,
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

export default router
