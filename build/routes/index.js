"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _auth = _interopRequireDefault(require("./auth"));
var _tag = _interopRequireDefault(require("./tag"));
var _history = _interopRequireDefault(require("./history"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.use(_auth.default);
router.use(_tag.default);
router.use(_history.default);
var _default = router;
exports.default = _default;