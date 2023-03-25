"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _authController = require("./auth-controller");
Object.keys(_authController).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _authController[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _authController[key];
    }
  });
});