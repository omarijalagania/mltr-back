import crypto from "crypto"

const generateCode = () => {
  const str = Math.random().toString(36).substring(2, 8) // Generate a random string
  return hashString(str).substring(0, 6) // Hash the string and return the first 6 characters
}

const hashString = (str: string, type = "md5") => {
  return crypto.createHash(type).update(str).digest("hex")
}

export { generateCode }
