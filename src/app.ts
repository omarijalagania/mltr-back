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

connectDB(false)

export const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(cors({ credentials: true, origin: "http://localhost:3000" }))
app.use(cookieParser())
app.use(bodyParser.json())

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.use("/auth", authRoute)

app.get("/", async (_, res) => {
  res.status(200).send("Welcome to Node.js")
})

app.listen(process.env.SERVER_PORT, () =>
  console.log(
    `Server is listening at http://localhost:${process.env.SERVER_PORT}`
  )
)
