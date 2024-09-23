import { Request, Response } from "express"
import AdminEmailSendLogs from "models/AdminEmailSendLogs"
import AdminEmailLog from "models/AdminEmailSendLogs"
import EmailLog from "models/EmailLog"

export const recordEmailSendLog = async (req: Request, res: Response) => {
  const { senderId, sendTo, subject, body } = req.body

  try {
    // Creating admin email log
    const adminEmailLog = new AdminEmailLog({ senderId: senderId })
    await adminEmailLog.save()

    // Creating multiple email logs and linking them to the admin log
    const emailLogs = sendTo.map((email: string) => ({
      adminEmailLogId: adminEmailLog._id,
      senderId: senderId,
      sendTo: email,
      subject: subject,
      body: body,
    }))

    await EmailLog.insertMany(emailLogs)

    type Log = {
      adminEmailLogId: string
      senderId: string
      sendTo: string
      subject: string
      body: string
      _id: string
    }

    // Updating admin email log with the new email log IDs
    await AdminEmailLog.findByIdAndUpdate(adminEmailLog._id, {
      logs: emailLogs.map((log: Log) => log._id),
    })

    return res.status(200).json({ message: "Log recorded successfully" })
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong..." })
  }
}

// export const getEmailSendLogs = async (req: Request, res: Response) => {
//   try {
//     const allLogs = await EmailLog.find()
//       .populate("senderId", "email") // Populate sender email
//       .sort({ sendedAt: -1 })
//       .exec()

//     return res.status(200).json({ data: allLogs })
//   } catch (error) {
//     return res.status(500).json({ message: "Something went wrong..." })
//   }
// }

export const getEmailSendLogs = async (req: Request, res: Response) => {
  try {
    const admins = await AdminEmailSendLogs.find().populate({
      path: "senderId",
      select: "email",
    })
    res.status(200).json({ data: admins })
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong..." })
  }
}

export const getEmailSendLogById = async (req: Request, res: Response) => {
  const { id } = req.params
  console.log(id)

  try {
    const admin = await EmailLog.find({
      senderId: id,
    }).populate({
      path: "senderId",
      select: ["email", "_id"],
    })

    res.status(200).json({ data: admin })
  } catch (error) {}
}
