"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _middlewares = require("../middlewares");
var _controllers = require("../controllers");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.post("/user-weight", _middlewares.authMiddleware, _controllers.addUserWeight);
router.get("/user-weight/:userId", _middlewares.authMiddleware, _controllers.getUserWeight);
router.patch("/user-weight", _middlewares.authMiddleware, _controllers.updateUserWeight);
var _default = router;
exports.default = _default;