"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userSchema = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const userSchema = _joi.default.object({
  email: _joi.default.string().email().required(),
  code: _joi.default.string().min(6).required(),
  googleId: _joi.default.string().optional(),
  sex: _joi.default.string().valid("male", "female", "other").optional(),
  birth: _joi.default.string().optional(),
  height: _joi.default.number().min(1).max(300).optional(),
  is_ft_height: _joi.default.boolean().optional(),
  body_type: _joi.default.string().optional(),
  physical_activities: _joi.default.string().optional(),
  weight: _joi.default.number().min(1).max(1000).optional(),
  is_ft_weight: _joi.default.boolean().optional()
});
exports.userSchema = userSchema;