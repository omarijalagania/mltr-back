const generateCode = () => {
  const num = Math.floor(Math.random() * 100000)
  const str = num.toString().padStart(5, "0")
  return str
}

export { generateCode }
