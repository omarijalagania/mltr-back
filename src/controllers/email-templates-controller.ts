import { Request, Response } from "express"
import EmailTemplate from "models/EmailTemplate"

export const getAllEmailTemplates = async (req: Request, res: Response) => {
  try {
    const emailTemplates = await EmailTemplate.find()
    res.status(200).json(emailTemplates)
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong..." })
  }
}
