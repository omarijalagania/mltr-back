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

//new routes

router.get("/all-new-tags/:userId", _middlewares.authMiddleware, _controllers.getAllNewTags);
router.post("/add-new-tag", _middlewares.authMiddleware, _controllers.createNewTag);
router.post("/hide-new-tag", _middlewares.authMiddleware, _controllers.hideNewTag);
router.post("/edit-new-tag-name", _middlewares.authMiddleware, _controllers.editNewTag);
var _default = router;
exports.default = _default;