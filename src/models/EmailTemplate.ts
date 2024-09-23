import mongoose from "mongoose"

const emailTemplateSchema = new mongoose.Schema({
  name: { type: String },
})

export default mongoose.model("EmailTemplate", emailTemplateSchema)
