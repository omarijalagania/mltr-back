import mongoose from "mongoose"

const emailLogSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  sendTo: {
    type: [String], // Array of recipient emails
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  sendedAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model("EmailLog", emailLogSchema)
