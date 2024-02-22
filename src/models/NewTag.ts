import mongoose from "mongoose"

const newTagSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  tagsArray: [
    {
      elementType: { type: String },
      identifire: String,
      isHide: Boolean,
      isSetTag: Boolean,
      tagName: String,
    },
  ],
})
export default mongoose.model("NewTag", newTagSchema)
