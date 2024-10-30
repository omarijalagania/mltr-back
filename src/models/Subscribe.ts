import mongoose from "mongoose"

const subscribeSchema = new mongoose.Schema(
  {
    appHubId: {
      type: String,
      required: true,
    },

    eventStatus: {
      type: String,
      required: true,
    },

    eventReason: {
      type: String,
      required: true,
    },

    purchasedAt: {
      type: Date,
      required: true,
    },

    userId: {
      type: String,
      required: true,
    },

    userSubscriptions: [],
  },
  {
    timestamps: true,
  },
)

export default mongoose.model("Subscribe", subscribeSchema)
