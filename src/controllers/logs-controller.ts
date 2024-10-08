import { Request, Response } from "express"
import { User } from "models"
import AdminEmailSendLogs from "models/AdminEmailSendLogs"
import AdminEmailLog from "models/AdminEmailSendLogs"
import Bug from "models/Bug"
import EmailLog from "models/EmailLog"

export const recordEmailSendLog = async (req: Request, res: Response) => {
  const { senderId, sendTo, subject, body } = req.body

  try {
    // Check if an admin email log already exists for the sender
    let adminEmailLog = await AdminEmailLog.findOne({ senderId })

    if (!adminEmailLog) {
      // Create a new admin email log if it doesn't exist
      adminEmailLog = new AdminEmailLog({ senderId })
      await adminEmailLog.save()
    }

    // Creating multiple email logs and linking them to the admin log
    const emailLogs = sendTo.map((email: string) => ({
      adminEmailLogId: adminEmailLog._id,
      senderId: senderId,
      sendTo: email,
      subject: subject,
      body: body,
    }))

    const insertedEmailLogs = await EmailLog.insertMany(emailLogs)

    // Updating admin email log with the new email log IDs
    await AdminEmailLog.findByIdAndUpdate(adminEmailLog._id, {
      $push: { logs: { $each: insertedEmailLogs.map((log) => log._id) } },
    })

    return res.status(200).json({ message: "Log recorded successfully" })
  } catch (error) {
    console.error("Error recording email send log:", error)
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
  const startDate = req.query.startDate
    ? new Date(req.query.startDate as string)
    : null
  const endDate = req.query.endDate
    ? new Date(req.query.endDate as string)
    : null
  const limit = req.query.limit ? parseInt(req.query.limit as string) : 10
  const page = req.query.page ? parseInt(req.query.page as string) : 1

  const sortOrder = req.query.sortOrder || "desc"
  const sortField: string = (req.query.sortField as string) || "sendedAt"
  const search = (req.query.search as string) ?? ""

  if (
    (startDate && isNaN(startDate.getTime())) ||
    (endDate && isNaN(endDate.getTime()))
  ) {
    return res.status(400).json({ message: "Invalid date format" })
  }

  const SearchQuery: any = search
    ? {
        $or: [
          { subject: { $regex: search, $options: "i" } },
          { body: { $regex: search, $options: "i" } },
        ],
      }
    : {}

  // Build the query based on the presence of startDate and endDate
  const query: any = { senderId: id, ...SearchQuery }
  if (startDate && endDate) {
    query.sendedAt = { $gte: startDate, $lte: endDate }
  } else if (startDate) {
    query.sendedAt = { $gte: startDate }
  } else if (endDate) {
    query.sendedAt = { $lte: endDate }
  }

  try {
    // Count the total number of logs for pagination
    const totalLogs = await EmailLog.countDocuments(query)
    const totalPages = totalLogs && limit > 0 ? Math.ceil(totalLogs / limit) : 1

    let logs = await EmailLog.find(query)
      .populate({
        path: "senderId",
        select: ["email", "_id"],
      })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ [sortField]: sortOrder === "asc" ? 1 : -1 })

    if (!logs || logs.length === 0) {
      return res.status(404).json({ message: "No logs found" })
    }

    res.status(200).json({
      data: logs,
      pagination: {
        totalLogs,
        totalPages,
        currentPage: page,
        limit,
      },
    })
  } catch (error) {
    console.error("Error fetching email logs:", error)
    res.status(500).json({ message: "Something went wrong..." })
  }
}

//BUgs

export const createBugReport = async (req: Request, res: Response) => {
  const { title, description } = req.body

  try {
    const bug = new Bug({ title, description })
    await bug.save()

    return res.status(201).json({ message: "Bug report created" })
  } catch (error) {
    console.error("Error creating bug report:", error)
    return res.status(500).json({ message: "Something went wrong..." })
  }
}

export const getBugReports = async (req: Request, res: Response) => {
  try {
    const bugs = await Bug.find().sort({ createdAt: -1 }).exec()
    return res.status(200).json({ data: bugs })
  } catch (error) {
    console.error("Error fetching bug reports:", error)
    return res.status(500).json({ message: "Something went wrong..." })
  }
}

export const editBugReport = async (req: Request, res: Response) => {
  const { id } = req.params
  const { title, description, isActive } = req.body

  try {
    const bug = await Bug.findByIdAndUpdate(
      id,
      { title, description, isActive },
      { new: true },
    )

    if (!bug) {
      return res.status(404).json({ message: "Bug report not found" })
    }

    return res.status(200).json({ message: "Bug report updated" })
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong..." })
  }
}

export const getBugById = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const bug = await Bug.findById(id)
    if (!bug) {
      return res.status(404).json({ message: "Bug report not found" })
    }

    return res.status(200).json({ data: bug })
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong..." })
  }
}

export const deleteBugReport = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const bug = await Bug.findByIdAndDelete(id)
    if (!bug) {
      return res.status(404).json({ message: "Bug report not found" })
    }

    return res.status(200).json({ message: "Bug report deleted" })
  } catch (error) {
    console.error("Error deleting bug report:", error)
    return res.status(500).json({ message: "Something went wrong..." })
  }
}

// Statistics

export const getUsersByCountry = async (req: Request, res: Response) => {
  try {
    // MongoDB aggregation to group users by country and count them
    const countryCount = await User.aggregate([
      {
        $group: {
          _id: "$geo", // Group by 'geo' field
          count: { $sum: 1 }, // Count the number of users in each country
        },
      },
    ])

    // Mapping to the desired format
    const data = countryCount.map((item) => ({
      country: item._id, // Use geo code as country
      value: item.count, // Use count as value
    }))

    // Response
    res.json(data)
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong..." })
  }
}
