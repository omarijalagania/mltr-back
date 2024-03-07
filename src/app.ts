import dotenv from "dotenv"
dotenv.config()
import express from "express"
import path from "path"
import cors from "cors"
import bodyParser from "body-parser"
import { connectDB } from "config"
import authRoute from "./routes"
import tagRoute from "./routes"
import historyRoute from "./routes"
import privacyRoute from "./routes"
import statisticsRoute from "./routes"
import foodRoute from "./routes"
import termsRoute from "./routes"
import YAML from "yamljs"
import swaggerUI from "swagger-ui-express"

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
    app.use(express.urlencoded({ extended: true }))
    app.use(bodyParser.json())
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

    app.listen(process.env.SERVER_PORT, () =>
      console.log(
        `Server is listening at http://localhost:${process.env.SERVER_PORT}`,
      ),
    )
  })
  .catch((error) => {
    console.error(`Failed to connect to MongoDB: ${error.message}`)
  })
