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
router.post("/create", _middlewares.authMiddleware, _controllers.createTag);
router.post("/get", _middlewares.authMiddleware, _controllers.getTags);
router.patch("/edit", _middlewares.authMiddleware, _controllers.editTag);
router.delete("/delete", _middlewares.authMiddleware, _controllers.deleteTags);
var _default = router;
exports.default = _default;