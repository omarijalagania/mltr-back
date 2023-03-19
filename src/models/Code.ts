import mongoose from "mongoose"

const codeSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  code: {
    type: String,
  },
  generated: { type: Date, default: Date.now },
})

export default mongoose.model("Code", codeSchema)
