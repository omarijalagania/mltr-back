"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const historySchema = new _mongoose.default.Schema({
  weight: {
    type: Number
  },
  date: {
    type: String
  },
  userId: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: "User"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
var _default = _mongoose.default.model("History", historySchema);
exports.default = _default;