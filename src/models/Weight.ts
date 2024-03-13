import mongoose from "mongoose"

const weightSchema = new mongoose.Schema({
  weight: {
    type: Number,
  },
  date: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model("Weight", weightSchema)
