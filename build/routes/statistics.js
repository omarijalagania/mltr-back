"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _middlewares = require("../middlewares");
var _statisticsController = require("../controllers/statistics-controller");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.get("/all-stats/:userId", _middlewares.authMiddleware, _statisticsController.getAllStatistics);
router.get("/weight-stats/:userId", _middlewares.authMiddleware, _statisticsController.getWeightStatistics);
var _default = router;
exports.default = _default;