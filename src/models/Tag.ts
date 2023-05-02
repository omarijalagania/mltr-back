import mongoose from "mongoose"

const tagSchema = new mongoose.Schema({
  identifire: {
    type: String,
  },
  tagName: {
    type: String,
  },
  isSetTag: {
    type: Boolean,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model("Tag", tagSchema)
