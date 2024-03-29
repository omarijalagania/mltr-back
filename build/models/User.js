"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const userSchema = new _mongoose.default.Schema({
  email: {
    type: String
  },
  appleToken: {
    type: String
  },
  googleId: {
    type: String
  },
  username: {
    type: String
  },
  sex: {
    type: String
  },
  birth: {
    type: String
  },
  height: {
    type: Number
  },
  is_ft_heigth: {
    type: Boolean
  },
  body_type: {
    type: String
  },
  physical_activities: {
    type: String
  },
  weight: {
    type: Number
  },
  is_ft_weight: {
    type: Boolean
  },
  protein: {
    type: Number
  },
  calories: {
    type: Number
  },
  carbs: {
    type: Number
  },
  fat: {
    type: Number
  },
  customGoal: {
    type: Boolean
  },
  code: {
    type: String
  },
  status: {
    type: String
  },
  deactivateCode: {
    type: String
  },
  water: {
    type: Number,
    default: 0
  },
  joined: {
    type: Date,
    default: Date.now
  }
});
var _default = _mongoose.default.model("User", userSchema);
exports.default = _default;