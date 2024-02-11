import { Request } from "express"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import { JwtPayload } from "jsonwebtoken"

const generateCode = () => {
  const num = Math.floor(Math.random() * 100000)
  const str = num.toString().padStart(5, "0")
  return str
}

const isValidId = (id: string) => {
  const isValid = mongoose.Types.ObjectId.isValid(id)
  return isValid
}

function decodeTokenAndGetUserId(req: Request, userId: string) {
  const authHeader = req.headers["authorization"]
  const token = (authHeader && authHeader.split(" ")[1]) || ""
  const decoded = jwt.decode(token) as JwtPayload

  if (decoded && decoded._id && decoded._id.toString() === userId.toString()) {
    return true
  } else {
    return false
  }
}

export { generateCode, isValidId, decodeTokenAndGetUserId }
