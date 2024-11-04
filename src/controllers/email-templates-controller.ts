import { Request, Response } from "express"
import EmailTemplate from "models/EmailTemplate"
import Template from "models/Template"

export const getAllEmailTemplates = async (req: Request, res: Response) => {
  try {
    const emailTemplates = await EmailTemplate.find()
    res.status(200).json(emailTemplates)
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong..." })
  }
}

//Templates

export const createNewTemplate = async (req: Request, res: Response) => {
  const { creatorId, subject, body } = req.body

  try {
    const template = new Template({ creatorId, subject, body })
    await template.save()

    return res.status(201).json({ message: "Template created" })
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong..." })
  }
}

export const getAllTemplates = async (req: Request, res: Response) => {
  try {
    const templates = await Template.find().populate({
      path: "creatorId",
      select: "email",
    })

    res.status(200).json(templates)
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong..." })
  }
}

export const getSingleTemplate = async (req: Request, res: Response) => {
  const { id } = req.params

  console.log(id)

  try {
    const template = await Template.findOne({ _id: id })
    if (!template) {
      return res.status(404).json({ message: "Template not found" })
    }
    res.status(200).json(template)
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong..." })
  }
}

export const updateTemplate = async (req: Request, res: Response) => {
  const { id } = req.params
  const { subject, body } = req.body

  try {
    const template = await Template.findByIdAndUpdate(
      { _id: id },
      { subject, body },
      { new: true },
    )
    if (!template) {
      return res.status(404).json({ message: "Template not found" })
    }
    res.status(200).json({ message: "Template updated" })
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong..." })
  }
}

export const deleteTemplate = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const template = await Template.findByIdAndDelete(id)
    if (!template) {
      return res.status(404).json({ message: "Template not found" })
    }
    res.status(200).json({ message: "Template deleted" })
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong..." })
  }
}
