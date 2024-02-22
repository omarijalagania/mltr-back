"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hideNewTag = exports.getTags = exports.getAllNewTags = exports.editTag = exports.editNewTag = exports.deleteTags = exports.createTag = exports.createNewTag = void 0;
var _helpers = require("../helpers");
var _models = require("../models");
const createTag = async (req, res) => {
  const {
    identifire,
    tagName,
    isSetTag,
    userId
  } = req.body;
  const isValid = (0, _helpers.isValidId)(userId);
  try {
    if (!isValid) {
      return res.status(422).json({
        message: "Invalid userId"
      });
    }
    if (identifire === "" || tagName === "" || isSetTag === "" || userId === "" || identifire === undefined || tagName === undefined || isSetTag === undefined || userId === undefined) {
      return res.status(422).json({
        message: "Fill all the fields"
      });
    } else {
      const newTag = await _models.Tag.create({
        identifire,
        tagName,
        isSetTag,
        userId
      });
      res.status(201).json({
        message: "Tag added",
        Tag: newTag
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong..."
    });
  }
};
exports.createTag = createTag;
const getTags = async (req, res) => {
  const {
    userId
  } = req.body;
  const isValid = (0, _helpers.isValidId)(userId);
  try {
    if (!isValid) {
      return res.status(422).json({
        message: "Invalid userId"
      });
    }
    const tags = await _models.Tag.find({
      userId
    });
    if (!tags) {
      return res.status(404).json({
        message: "No tags"
      });
    }
    return res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong..."
    });
  }
};
exports.getTags = getTags;
const editTag = async (req, res) => {
  const {
    identifire,
    tagName,
    isSetTag,
    userId,
    tagId
  } = req.body;
  const isValid = (0, _helpers.isValidId)(userId);
  const isValidTagId = (0, _helpers.isValidId)(tagId);
  try {
    if (!isValid || !isValidTagId) {
      return res.status(422).json({
        message: "Invalid Id"
      });
    }
    if (identifire === "" || tagName === "" || isSetTag === "" || userId === "" || identifire === undefined || tagName === undefined || isSetTag === undefined || userId === undefined) {
      return res.status(422).json({
        message: "Fill all the fields"
      });
    } else {
      const tag = await _models.Tag.findOneAndUpdate({
        _id: tagId,
        userId
      }, {
        identifire,
        tagName,
        isSetTag
      }, {
        new: true
      });
      res.status(201).json({
        message: "Tag edited",
        Tag: tag
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong..."
    });
  }
};
exports.editTag = editTag;
const deleteTags = async (req, res) => {
  const {
    userId,
    tagId
  } = req.body;
  const isValid = (0, _helpers.isValidId)(userId);
  const isValidTagId = (0, _helpers.isValidId)(tagId);
  try {
    if (!isValid || !isValidTagId) {
      return res.status(422).json({
        message: "Invalid Id"
      });
    }
    const tags = await _models.Tag.deleteOne({
      _id: tagId,
      userId
    });
    if (!tags) {
      return res.status(404).json({
        message: "No tags"
      });
    }
    return res.status(200).json({
      message: "Tag deleted"
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong..."
    });
  }
};

//New Tags Controller
exports.deleteTags = deleteTags;
const getAllNewTags = async (req, res) => {
  const {
    userId
  } = req.params;
  const isValid = (0, _helpers.isValidId)(userId);
  const isUserIdValid = (0, _helpers.decodeTokenAndGetUserId)(req, userId);
  try {
    if (!isValid) {
      return res.status(422).json({
        message: "Invalid userId"
      });
    }
    if (!isUserIdValid) {
      return res.status(403).json({
        message: "Not authorized"
      });
    }
    const tags = await _models.NewTag.find({
      userId
    });
    return res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong..."
    });
  }
};
exports.getAllNewTags = getAllNewTags;
const createNewTag = async (req, res) => {
  const {
    userId,
    tagsArray
  } = req.body;
  const isValid = (0, _helpers.isValidId)(userId);
  const isUserIdValid = (0, _helpers.decodeTokenAndGetUserId)(req, userId);
  try {
    if (!isValid) {
      return res.status(422).json({
        message: "Invalid userId"
      });
    }
    if (!isUserIdValid) {
      return res.status(403).json({
        message: "Not authorized"
      });
    }
    await _models.NewTag.create({
      userId,
      tagsArray
    });
    return res.status(201).json({
      message: "Tags added"
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong..."
    });
  }
};
exports.createNewTag = createNewTag;
const editNewTag = async (req, res) => {
  const {
    userId,
    tagId,
    tagName
  } = req.body;
  const isValid = (0, _helpers.isValidId)(userId);
  const isValidTagId = (0, _helpers.isValidId)(tagId);
  const isUserIdValid = (0, _helpers.decodeTokenAndGetUserId)(req, userId);
  try {
    if (!isValid || !isValidTagId) {
      return res.status(422).json({
        message: "Invalid Id"
      });
    }
    if (!isUserIdValid) {
      return res.status(403).json({
        message: "Not authorized"
      });
    }
    const tags = await _models.NewTag.findOneAndUpdate({
      userId,
      "tagsArray._id": tagId
    }, {
      "tagsArray.$.tagName": tagName
    }, {
      new: true
    });
    if (!tags) {
      return res.status(404).json({
        message: "No tags"
      });
    }
    return res.status(200).json({
      message: "Tag Name updated"
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong..."
    });
  }
};
exports.editNewTag = editNewTag;
const hideNewTag = async (req, res) => {
  const {
    userId,
    tagId
  } = req.body;
  const isValid = (0, _helpers.isValidId)(userId);
  const isValidTagId = (0, _helpers.isValidId)(tagId);
  const isUserIdValid = (0, _helpers.decodeTokenAndGetUserId)(req, userId);
  try {
    if (!isValid || !isValidTagId) {
      return res.status(422).json({
        message: "Invalid Id"
      });
    }
    if (!isUserIdValid) {
      return res.status(403).json({
        message: "Not authorized"
      });
    }
    const tags = await _models.NewTag.findOneAndUpdate({
      userId,
      "tagsArray._id": tagId
    }, {
      "tagsArray.$.isHide": true
    }, {
      new: true
    });
    if (!tags) {
      return res.status(404).json({
        message: "No tags"
      });
    }
    return res.status(200).json({
      message: "Tag hidden"
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong..."
    });
  }
};
exports.hideNewTag = hideNewTag;