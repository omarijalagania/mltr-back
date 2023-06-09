"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _controllers = require("../controllers");
var _middlewares = require("../middlewares");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.post("/add", _middlewares.authMiddleware, _controllers.createHistory);
router.post("/fetch", _middlewares.authMiddleware, _controllers.getHistory);
router.patch("/patch", _middlewares.authMiddleware, _controllers.editHistory);
router.delete("/remove", _middlewares.authMiddleware, _controllers.deleteHistory);
var _default = router;
exports.default = _default;