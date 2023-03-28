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

//Google - Apple auth route

router.post("/google-apple-login", _controllers.loginWithoutCode);

//Email & Password

router.post("/login", _controllers.userLogin);
router.post("/register", _controllers.userRegister);
router.post("/deactivate-account", _middlewares.authMiddleware, _controllers.deactivateAccount);
router.post("/confirm-deactivate-account", _middlewares.authMiddleware, _controllers.confirmDeactivationCode);
var _default = router;
exports.default = _default;