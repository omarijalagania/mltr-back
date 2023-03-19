import Joi from "joi"

export const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  googleId: Joi.string().optional(),
  sex: Joi.string().valid("male", "female", "other").optional(),
  birth: Joi.string().isoDate().optional(),
  height: Joi.number().min(1).max(300).optional(),
  is_ft_height: Joi.boolean().optional(),
  body_type: Joi.string().optional(),
  physical_activities: Joi.string().optional(),
  weight: Joi.number().min(1).max(1000).optional(),
  is_ft_weight: Joi.boolean().optional(),
})
