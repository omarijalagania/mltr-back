import mongoose from "mongoose"

const userFoodHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  userFoodHistoryList: [
    {
      calories: { type: Number },
      carbs: { type: Number },
      fat: { type: Number },
      protein: { type: Number },
      water: { type: Number },
      weight: { type: Number },
      selectedDate: { type: String },
      id: { type: String },
      name: { type: String },
      servingName: { type: String },
      foodList: [
        {
          myFoodId: {
            type: String,
          },
          pceCount: {
            type: Number,
          },
        },
      ],
    },
  ],
})

export default mongoose.model("UserFoodHistory", userFoodHistorySchema)
