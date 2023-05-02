import mongoose from "mongoose"

const generateCode = () => {
  const num = Math.floor(Math.random() * 100000)
  const str = num.toString().padStart(5, "0")
  return str
}

const isValidId = (id: string) => {
  const isValid = mongoose.Types.ObjectId.isValid(id)
  return isValid
}

export { generateCode, isValidId }
