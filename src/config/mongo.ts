import mongoose from "mongoose"
import { compassMongoConnection, atlasMongoConnection } from "./index"

const connectDB = async (close: boolean) => {
  try {
    let connectionUrl
    if (process.env.MONGO_PROTOCOL === "mongodb") {
      connectionUrl = compassMongoConnection()
    } else {
      connectionUrl = atlasMongoConnection()
    }

    const connect = await mongoose.connect(connectionUrl)

    console.log(`MongoDB Connected: ${connect.connection.host}`)
    if (close) {
      await mongoose.connection.close()
    }
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export default connectDB
