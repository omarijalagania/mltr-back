"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const newTagSchema = new _mongoose.default.Schema({
  userId: {
    type: _mongoose.default.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  tagsArray: [{
    elementType: {
      type: String
    },
    identifire: String,
    isHide: Boolean,
    isSetTag: Boolean,
    tagName: String
  }]
});
var _default = _mongoose.default.model("NewTag", newTagSchema);
exports.default = _default;