import Joi from "joi"

export const userSchema = Joi.object({
  email: Joi.string().email().required(),
  code: Joi.string().min(6).required(),
  googleId: Joi.string().optional(),
  sex: Joi.string().valid("male", "female", "other").optional(),
  birth: Joi.string().optional(),
  height: Joi.number().min(1).max(300).optional(),
  is_ft_height: Joi.boolean().optional(),
  body_type: Joi.string().optional(),
  physical_activities: Joi.string().optional(),
  weight: Joi.number().min(1).max(1000).optional(),
  is_ft_weight: Joi.boolean().optional(),
  water: Joi.number().min(0).max(10000).optional(),
  geo: Joi.string().optional(),
})
