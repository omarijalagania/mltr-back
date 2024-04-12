"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _controllers = require("../controllers");
var _express = _interopRequireDefault(require("express"));
var _middlewares = require("../middlewares");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.get("/get-food", _middlewares.authMiddleware, _controllers.getAllFoods);
router.post("/post-food", _middlewares.authMiddleware, _controllers.addFood);
router.post("/delete-food", _middlewares.authMiddleware, _controllers.removeFood);
router.patch("/update-food", _middlewares.authMiddleware, _controllers.updateFood);

//test

router.post("/generate-text", _controllers.generateText);
router.post("/generate-image", _controllers.generateImage);
var _default = router;
exports.default = _default;