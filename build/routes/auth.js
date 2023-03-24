"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _controllers = require("../controllers");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();

// Google auth
router.get("/google", _controllers.googleAuthMiddleware);
router.get("/google/callback", _controllers.googleFallbackMiddleware);

// log out and user info
router.post("/logout", _controllers.logOut);
router.get("/get-user", _controllers.getUser);

//Email & Password

router.post("/register", _controllers.userRegister);
router.post("/login", _controllers.userLogin);
var _default = router;
exports.default = _default;