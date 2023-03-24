"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const codeSchema = new _mongoose.default.Schema({
  email: {
    type: String
  },
  code: {
    type: String
  },
  generated: {
    type: Date,
    default: Date.now
  }
});
var _default = _mongoose.default.model("Code", codeSchema);
exports.default = _default;