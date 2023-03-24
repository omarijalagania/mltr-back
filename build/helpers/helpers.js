"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateCode = void 0;
var _crypto = _interopRequireDefault(require("crypto"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const generateCode = () => {
  const str = Math.random().toString(36).substring(2, 8); // Generate a random string
  return hashString(str).substring(0, 6); // Hash the string and return the first 6 characters
};
exports.generateCode = generateCode;
const hashString = (str, type = "md5") => {
  return _crypto.default.createHash(type).update(str).digest("hex");
};