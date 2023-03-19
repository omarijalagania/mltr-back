import Joi from "joi"

export const codeSchema = Joi.object({
  email: Joi.string().email().required(),
  code: Joi.string().length(6).required(),
})
