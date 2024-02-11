"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const userFoodListSchema = new _mongoose.default.Schema({
  userId: {
    type: _mongoose.default.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  userFoodList: [{
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
    foodList: [{
      foodId: {
        type: String
      },
      pceCount: {
        type: Number,
        required: true
      }
    }]
  }]
});
var _default = _mongoose.default.model("UserFoodList", userFoodListSchema);
exports.default = _default;