"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decodeTokenAndGetUserId = decodeTokenAndGetUserId;
exports.isValidId = exports.generateCode = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
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
function decodeTokenAndGetUserId(req, userId) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1] || "";
  const decoded = _jsonwebtoken.default.decode(token);
  if (decoded && decoded._id && decoded._id.toString() === userId.toString()) {
    return true;
  } else {
    return false;
  }
}