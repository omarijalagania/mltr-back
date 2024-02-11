"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const foodSchema = new _mongoose.default.Schema({
  calories: {
    type: Number
  },
  carbs: {
    type: Number
  },
  createdDate: {
    type: Date
  },
  eatsTimes: {
    type: Number
  },
  fat: {
    type: Number
  },
  isInFridge: {
    type: Boolean
  },
  isLiquid: {
    type: Boolean
  },
  isRemoved: {
    type: Boolean
  },
  isSet: {
    type: Boolean
  },
  protein: {
    type: Number
  },
  tag: {
    type: String
  },
  water: {
    type: Number
  },
  weight: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
var _default = _mongoose.default.model("Food", foodSchema);
exports.default = _default;