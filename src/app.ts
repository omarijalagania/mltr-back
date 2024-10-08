import dotenv from "dotenv"
dotenv.config()
import express from "express"
import path from "path"
import cors from "cors"
import bodyParser from "body-parser"
import cron from "node-cron"
import { connectDB } from "config"
import authRoute from "./routes"
import tagRoute from "./routes"
import historyRoute from "./routes"
import privacyRoute from "./routes"
import statisticsRoute from "./routes"
import foodRoute from "./routes"
import termsRoute from "./routes"
import weightRoute from "./routes"
import logRoute from "./routes"
import YAML from "yamljs"
import swaggerUI from "swagger-ui-express"
import { User } from "models"

export const app = express()

/**
 * Load swagger document.
 */
const swaggerDocument = YAML.load("./src/config/swagger.yaml")
/**
 * Setting up swagger middleware.
 */
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument))
app.use(express.static(path.resolve("./public")))

connectDB(false)
  .then(() => {
    app.use(express.json({ limit: "50mb" }))
    app.use(express.urlencoded({ limit: "50mb" }))

    app.use(cors({}))

    // app.get("/", async (_, res) => {
    //   res.status(200).send("Welcome to Node.js Server")
    // })

    app.use("/", privacyRoute)
    app.use("/", termsRoute)
    app.use("/history", historyRoute)
    app.use("/auth", authRoute)
    app.use("/tag", tagRoute)
    app.use("/food", foodRoute)
    app.use("/statistics", statisticsRoute)
    app.use("/weight", weightRoute)
    app.use("/log", logRoute)

    // Schedule a cron job to run daily at midnight
    cron.schedule("0 0 * * *", async () => {
      try {
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

        // Find and remove users with status 'deleted' and deletedAt older than 30 days
        const result = await User.deleteMany({
          status: "deleted",
          deletedAt: { $lte: thirtyDaysAgo },
        })

        console.log(
          `Removed ${result.deletedCount} users with status 'deleted' older than 30 days`,
        )
      } catch (error) {
        console.error(
          "Error running cron job to remove old deleted accounts:",
          error,
        )
      }
    })

    app.listen(process.env.SERVER_PORT, () =>
      console.log(
        `Server is listening at http://localhost:${process.env.SERVER_PORT}`,
      ),
    )
  })
  .catch((error) => {
    console.error(`Failed to connect to MongoDB: ${error.message}`)
  })
