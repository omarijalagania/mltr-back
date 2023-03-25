"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;
var _dotenv = _interopRequireDefault(require("dotenv"));
var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _config = require("./config");
var _passport = _interopRequireDefault(require("passport"));
require("./config/passport");
var _routes = _interopRequireDefault(require("./routes"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_dotenv.default.config();
(0, _config.connectDB)(false);
const app = (0, _express.default)();
exports.app = app;
app.use(_express.default.urlencoded({
  extended: true
}));
app.use((0, _cors.default)({
  origin: "http://localhost:3000",
  credentials: true,
  preflightContinue: true
}));
app.use((0, _cookieParser.default)());
app.use(_bodyParser.default.json());
app.use((0, _expressSession.default)({
  secret: "your-secret-key",
  resave: false,
  saveUninitialized: true
}));
app.use(_passport.default.initialize());
app.use(_passport.default.session());
app.use("/auth", _routes.default);
app.get("/", async (_, res) => {
  res.status(200).send("Welcome to Node.js Server");
});
app.listen(process.env.SERVER_PORT, () => console.log(`Server is listening at http://localhost:${process.env.SERVER_PORT}`));