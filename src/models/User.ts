import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  appleToken: {
    type: String,
  },
  googleId: {
    type: String,
  },
  sex: {
    type: String,
  },
  birth: {
    type: String,
  },
  height: {
    type: Number,
  },
  is_ft_heigth: {
    type: Boolean,
  },
  body_type: {
    type: String,
  },
  physical_activities: {
    type: String,
  },
  weight: {
    type: Number,
  },
  is_ft_weight: {
    type: Boolean,
  },
  code: {
    type: String,
  },
  status: {
    type: String,
  },
  deactivateCode: {
    type: String,
  },

  joined: { type: Date, default: Date.now },
})

export default mongoose.model("User", userSchema)
