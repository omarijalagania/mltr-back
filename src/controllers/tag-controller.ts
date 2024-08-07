import { Request, Response } from "express"
import { decodeTokenAndGetUserId, isValidId } from "helpers"
import { NewTag, Tag } from "models"

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

//New Tags Controller

export const getAllNewTags = async (req: Request, res: Response) => {
  const { userId } = req.params

  const isValid = isValidId(userId)

  const isUserIdValid = decodeTokenAndGetUserId(req, userId)

  try {
    if (!isValid) {
      return res.status(422).json({ message: "Invalid userId" })
    }

    if (!isUserIdValid) {
      return res.status(403).json({ message: "Not authorized" })
    }

    const tags = await NewTag.find({ userId })

    return res.status(200).json(tags)
  } catch (error) {
    res.status(500).json({ message: "Something went wrong..." })
  }
}

export const createNewTag = async (req: Request, res: Response) => {
  const { userId, tagsArray } = req.body

  const isValid = isValidId(userId)

  const isUserIdValid = decodeTokenAndGetUserId(req, userId)

  try {
    if (!isValid) {
      return res.status(422).json({ message: "Invalid userId" })
    }
    if (!isUserIdValid) {
      return res.status(403).json({ message: "Not authorized" })
    }

    const user = await NewTag.findOne({ userId })

    if (user) {
      const userFoodList = await NewTag.findOneAndUpdate(
        { userId },
        { $push: { tagsArray: tagsArray } },
        { new: true },
      )
      return res.status(200).json(userFoodList)
    }

    const newTag = await NewTag.create({ userId, tagsArray })
    return res.status(201).json({ message: "Tags added", newTag })
  } catch (error) {
    res.status(500).json({ message: "Something went wrong..." })
  }
}

export const deleteAllNewTags = async (req: Request, res: Response) => {
  const { userId } = req.body
  const isValid = isValidId(userId)

  const isUserIdValid = decodeTokenAndGetUserId(req, userId)

  try {
    if (!isValid) {
      return res.status(422).json({ message: "Invalid userId" })
    }

    if (!isUserIdValid) {
      return res.status(403).json({ message: "Not authorized" })
    }

    const tags = await NewTag.deleteMany({ userId })

    if (!tags) {
      return res.status(404).json({ message: "No tags" })
    }
    return res.status(200).json({ message: "All tags deleted" })
  } catch (error) {
    res.status(500).json({ message: "Something went wrong..." })
  }
}

export const editNewTag = async (req: Request, res: Response) => {
  const { userId, tagId, tag } = req.body

  const isValid = isValidId(userId)
  const isValidTagId = isValidId(tagId)

  const isUserIdValid = decodeTokenAndGetUserId(req, userId)

  try {
    if (!isValid || !isValidTagId) {
      return res.status(422).json({ message: "Invalid Id" })
    }

    if (!isUserIdValid) {
      return res.status(403).json({ message: "Not authorized" })
    }

    const updateFields = {} as any
    for (const key in tag) {
      if (tag.hasOwnProperty(key)) {
        updateFields[`tagsArray.$.${key}`] = tag[key]
      }
    }

    const tags = await NewTag.findOneAndUpdate(
      { userId, "tagsArray._id": tagId },
      { $set: updateFields },
      { new: true },
    )

    if (!tags) {
      return res.status(404).json({ message: "No tags" })
    }
    return res.status(200).json({ message: "Tag updated", data: tags })
  } catch (error) {
    console.error("Error updating tag:", error)
    res.status(500).json({ message: "Something went wrong..." })
  }
}

export const hideNewTag = async (req: Request, res: Response) => {
  const { userId, tagId } = req.body
  const isValid = isValidId(userId)
  const isValidTagId = isValidId(tagId)

  const isUserIdValid = decodeTokenAndGetUserId(req, userId)

  try {
    if (!isValid || !isValidTagId) {
      return res.status(422).json({ message: "Invalid Id" })
    }

    if (!isUserIdValid) {
      return res.status(403).json({ message: "Not authorized" })
    }

    const tag = await NewTag.findOne({ userId, "tagsArray._id": tagId })
    if (!tag) {
      return res.status(404).json({ message: "No tags" })
    }

    //@ts-ignore
    const isHide = tag.tagsArray.id(tagId).isHide
    const updatedTag = await NewTag.findOneAndUpdate(
      { userId, "tagsArray._id": tagId },
      { "tagsArray.$.isHide": !isHide },
      { new: true },
    )

    if (!updatedTag) {
      return res.status(404).json({ message: "No tags" })
    }
    return res.status(200).json({ message: "Tag visibility toggled" })
  } catch (error) {
    res.status(500).json({ message: "Something went wrong..." })
  }
}
