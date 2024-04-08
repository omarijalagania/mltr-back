"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertToJSON = convertToJSON;
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
function convertToJSON(outputString) {
  // Remove triple backticks and newline characters
  const cleanedString = outputString.replace(/```|\n/g, "");

  // Remove curly braces enclosing the output
  const trimmedString = cleanedString.substring(1, cleanedString.length - 1);

  // Replace colons with quotes around keys
  const quotedKeysString = trimmedString.replace(/(\w+):/g, '"$1":');

  // Add double quotes around non-numeric values
  const jsonString = quotedKeysString.replace(/(\w+:)(\s*)(\D+)/g, '"$1$2$3"');

  // Parse the JSON string to convert it into a JavaScript object
  const jsonObject = JSON.parse(jsonString);
  return jsonObject;
}