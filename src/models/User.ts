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
  username: {
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
  protein: {
    type: Number,
  },
  calories: {
    type: Number,
  },
  carbs: {
    type: Number,
  },
  fat: {
    type: Number,
  },
  customGoal: {
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
  personal_goal: {
    type: Number,
    default: 0,
  },
  water: {
    type: Number,
    default: 0,
  },
  userLocation: {
    type: String,
  },
  geo: {
    type: { type: String },
  },

  isAdmin: {
    type: Boolean,
    default: false,
  },

  lastLogin: {
    type: Date,
  },

  joined: { type: Date, default: Date.now },
})

export default mongoose.model("User", userSchema)
