"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.codeSchema = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const codeSchema = _joi.default.object({
  email: _joi.default.string().email().required(),
  code: _joi.default.string().length(6).required()
});
exports.codeSchema = codeSchema;