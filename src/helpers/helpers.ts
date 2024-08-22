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

function convertToJSON(outputString: any) {
  // Remove triple backticks and newline characters
  const cleanedString = outputString.replace(/```|\n/g, "")

  // Remove curly braces enclosing the output
  const trimmedString = cleanedString.substring(1, cleanedString.length - 1)

  // Replace colons with quotes around keys
  const quotedKeysString = trimmedString.replace(/(\w+):/g, '"$1":')

  // Add double quotes around non-numeric values
  const jsonString = quotedKeysString.replace(/(\w+:)(\s*)(\D+)/g, '"$1$2$3"')

  // Parse the JSON string to convert it into a JavaScript object
  const jsonObject = JSON.parse(jsonString)

  return jsonObject
}

function convertArgumentsToJSON(argumentsString: any) {
  try {
    const jsonObject = JSON.parse(argumentsString)
    return jsonObject
  } catch (error) {
    console.error("Invalid JSON string", error)
    return null
  }
}

export {
  generateCode,
  isValidId,
  decodeTokenAndGetUserId,
  convertToJSON,
  convertArgumentsToJSON,
}
