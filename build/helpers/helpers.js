"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValidId = exports.generateCode = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const generateCode = () => {
  const num = Math.floor(Math.random() * 100000);
  const str = num.toString().padStart(5, "0");
  return str;
};
exports.generateCode = generateCode;
const isValidId = id => {
  const isValid = _mongoose.default.Types.ObjectId.isValid(id);
  return isValid;
};
exports.isValidId = isValidId;