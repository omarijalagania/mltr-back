"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;
var _dotenv = _interopRequireDefault(require("dotenv"));
var _express = _interopRequireDefault(require("express"));
var _path = _interopRequireDefault(require("path"));
var _cors = _interopRequireDefault(require("cors"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _config = require("./config");
var _routes = _interopRequireDefault(require("./routes"));
var _yamljs = _interopRequireDefault(require("yamljs"));
var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_dotenv.default.config();
const app = (0, _express.default)();

/**
 * Load swagger document.
 */
exports.app = app;
const swaggerDocument = _yamljs.default.load("./src/config/swagger.yaml");
/**
 * Setting up swagger middleware.
 */
app.use("/api-docs", _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(swaggerDocument));
app.use(_express.default.static(_path.default.resolve("./public")));
(0, _config.connectDB)(false).then(() => {
  app.use(_express.default.urlencoded({
    extended: true
  }));
  app.use(_bodyParser.default.json());
  app.use((0, _cors.default)({}));

  // app.get("/", async (_, res) => {
  //   res.status(200).send("Welcome to Node.js Server")
  // })

  app.use("/", _routes.default);
  app.use("/", _routes.default);
  app.use("/history", _routes.default);
  app.use("/auth", _routes.default);
  app.use("/tag", _routes.default);
  app.use("/food", _routes.default);
  app.listen(process.env.SERVER_PORT, () => console.log(`Server is listening at http://localhost:${process.env.SERVER_PORT}`));
}).catch(error => {
  console.error(`Failed to connect to MongoDB: ${error.message}`);
});