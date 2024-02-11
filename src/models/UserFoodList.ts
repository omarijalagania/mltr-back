import mongoose from "mongoose"

const userFoodListSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  userFoodList: [
    {
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
      foodList: [
        {
          foodId: {
            type: String,
          },
          pceCount: {
            type: Number,
            required: true,
          },
        },
      ],
    },
  ],
})

export default mongoose.model("UserFoodList", userFoodListSchema)
