"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;
var _dotenv = _interopRequireDefault(require("dotenv"));
var _express = _interopRequireDefault(require("express"));
var _https = _interopRequireDefault(require("https"));
var _fs = _interopRequireDefault(require("fs"));
var _cors = _interopRequireDefault(require("cors"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _config = require("./config");
var _passport = _interopRequireDefault(require("passport"));
require("./config/passport");
var _routes = _interopRequireDefault(require("./routes"));
var _mongo = require("./config/mongo");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_dotenv.default.config();
const app = (0, _express.default)();
exports.app = app;
(0, _config.connectDB)(false).then(() => {
  app.use(_express.default.urlencoded({
    extended: true
  }));
  app.use((0, _cookieParser.default)());
  app.use(_bodyParser.default.json());
  app.use((0, _cors.default)({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    optionsSuccessStatus: 200
  }));
  const sessionConfig = {
    secret: "mysecretsdfsdfkljsadflksjflsjkdflkj",
    resave: false,
    saveUninitialized: true,
    store: _mongo.storeMongo,
    cookie: {
      httpOnly: true,
      secure: true
    }
  };
  app.use((0, _expressSession.default)(sessionConfig));
  app.use(_passport.default.initialize());
  app.use(_passport.default.session());
  app.use("/auth", _routes.default);
  app.get("/", async (_, res) => {
    res.status(200).send("Welcome to Node.js Server");
  });
  const options = {
    key: _fs.default.readFileSync("server.key"),
    cert: _fs.default.readFileSync("server.cert")
  };
  const server = _https.default.createServer(options, (req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello, world!\n");
  });
  server.listen(process.env.SERVER_PORT, () => console.log(`Server is listening at http://localhost:${process.env.SERVER_PORT}`));
}).catch(error => {
  console.error(`Failed to connect to MongoDB: ${error.message}`);
});