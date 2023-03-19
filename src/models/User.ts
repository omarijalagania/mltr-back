import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  googleId: {
    type: String,
  },

  joined: { type: Date, default: Date.now },
})

export default mongoose.model("User", userSchema)
