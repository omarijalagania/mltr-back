import mongoose from "mongoose"

const adminEmailLogSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // References to logs
  logs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EmailLog",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model("AdminEmailLog", adminEmailLogSchema)
