import mongoose from "mongoose"

const foodSchema = new mongoose.Schema({
  calories: { type: Number },
  carbs: { type: Number },
  createdDate: { type: Date },
  eatsTimes: { type: Number },
  fat: { type: Number },
  isInFridge: { type: Boolean },
  isLiquid: { type: Boolean },
  isRemoved: { type: Boolean },
  isSet: { type: Boolean },
  protein: { type: Number },
  tag: { type: String },
  water: { type: Number },
  weight: { type: Number },
  name: { type: String },
  servingName: { type: String },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model("Food", foodSchema)
