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
    app.use(express.urlencoded({ extended: true }))
    app.use(cookieParser("mysecretsdfsdfkljsadflksjflsjkdflkj"))
    app.use(bodyParser.json())
    app.use(
      cors({
        origin: true,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        optionsSuccessStatus: 200,
      }),
    )

    const sessionConfig = {
      secret: "mysecretsdfsdfkljsadflksjflsjkdflkj",
      resave: false,
      saveUninitialized: false,
      store: storeMongo,
      cookie: {
        secure: true,
        httpOnly: true,
      },
    }
    app.use(session(sessionConfig))

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
