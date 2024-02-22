"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const userFoodHistorySchema = new _mongoose.default.Schema({
  userId: {
    type: _mongoose.default.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  userFoodHistoryList: [{
    calories: {
      type: Number
    },
    carbs: {
      type: Number
    },
    fat: {
      type: Number
    },
    protein: {
      type: Number
    },
    water: {
      type: Number
    },
    weight: {
      type: Number
    },
    selectedDate: {
      type: String
    },
    id: {
      type: String
    },
    foodList: [{
      myFoodId: {
        type: String
      },
      pceCount: {
        type: Number
      }
    }]
  }]
});
var _default = _mongoose.default.model("UserFoodHistory", userFoodHistorySchema);
exports.default = _default;