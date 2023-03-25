import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import session from "express-session"
import cookieParser from "cookie-parser"
import { connectDB } from "config"
import passport from "passport"
import "./config/passport"
import authRoute from "./routes"
import { storeMongo } from "config/mongo"

export const app = express()

connectDB(false)
  .then(() => {
    // Set up session middleware using the storeMongo object
    const sessionConfig = {
      secret: "mysecretsdfsdfkljsadflksjflsjkdflkj",
      resave: false,
      saveUninitialized: false,
      store: storeMongo,
      cookie: {
        secure: true,
      },
    }
    app.use(session(sessionConfig))
    app.use(express.urlencoded({ extended: true }))
    app.use(
      cors({
        origin: "http://localhost:3000",
        credentials: true,
      }),
    )
    app.use(cookieParser())
    app.use(bodyParser.json())

    app.use(passport.initialize())
    app.use(passport.session())

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
