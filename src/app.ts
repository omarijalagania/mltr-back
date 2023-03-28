import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import { connectDB } from "config"
import authRoute from "./routes"

export const app = express()

connectDB(false)
  .then(() => {
    app.use(express.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use(cors({}))

    app.use("/auth", authRoute)

    app.get("/", async (_, res) => {
      res.status(200).send("Welcome to Node.js Server")
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
