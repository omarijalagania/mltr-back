import { Request, Response } from "express"
import { isValidId } from "helpers"
import { Tag } from "models"

export const createTag = async (req: Request, res: Response) => {
  const { identifire, tagName, isSetTag, userId } = req.body
  const isValid = isValidId(userId)
  try {
    if (!isValid) {
      return res.status(422).json({ message: "Invalid userId" })
    }
    if (
      identifire === "" ||
      tagName === "" ||
      isSetTag === "" ||
      userId === "" ||
      identifire === undefined ||
      tagName === undefined ||
      isSetTag === undefined ||
      userId === undefined
    ) {
      return res.status(422).json({ message: "Fill all the fields" })
    } else {
      const newTag = await Tag.create({ identifire, tagName, isSetTag, userId })
      res.status(201).json({ message: "Tag added", Tag: newTag })
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong..." })
  }
}

export const getTags = async (req: Request, res: Response) => {
  const { userId } = req.body
  const isValid = isValidId(userId)
  try {
    if (!isValid) {
      return res.status(422).json({ message: "Invalid userId" })
    }

    const tags = await Tag.find({ userId })

    if (!tags) {
      return res.status(404).json({ message: "No tags" })
    }
    return res.status(200).json(tags)
  } catch (error) {
    res.status(500).json({ message: "Something went wrong..." })
  }
}

export const editTag = async (req: Request, res: Response) => {
  const { identifire, tagName, isSetTag, userId, tagId } = req.body
  const isValid = isValidId(userId)
  const isValidTagId = isValidId(tagId)
  try {
    if (!isValid || !isValidTagId) {
      return res.status(422).json({ message: "Invalid Id" })
    }

    if (
      identifire === "" ||
      tagName === "" ||
      isSetTag === "" ||
      userId === "" ||
      identifire === undefined ||
      tagName === undefined ||
      isSetTag === undefined ||
      userId === undefined
    ) {
      return res.status(422).json({ message: "Fill all the fields" })
    } else {
      const tag = await Tag.findOneAndUpdate(
        { _id: tagId, userId },
        { identifire, tagName, isSetTag },
        { new: true },
      )
      res.status(201).json({ message: "Tag edited", Tag: tag })
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong..." })
  }
}

export const deleteTags = async (req: Request, res: Response) => {
  const { userId, tagId } = req.body
  const isValid = isValidId(userId)
  const isValidTagId = isValidId(tagId)
  try {
    if (!isValid || !isValidTagId) {
      return res.status(422).json({ message: "Invalid Id" })
    }

    const tags = await Tag.deleteOne({ _id: tagId, userId })

    if (!tags) {
      return res.status(404).json({ message: "No tags" })
    }
    return res.status(200).json({ message: "Tag deleted" })
  } catch (error) {
    res.status(500).json({ message: "Something went wrong..." })
  }
}
