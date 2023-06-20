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
var _tagController = require("./tag-controller");
Object.keys(_tagController).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _tagController[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _tagController[key];
    }
  });
});
var _historyController = require("./history-controller");
Object.keys(_historyController).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _historyController[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _historyController[key];
    }
  });
});
var _privacyController = require("./privacy-controller");
Object.keys(_privacyController).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _privacyController[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _privacyController[key];
    }
  });
});
var _termsController = require("./terms-controller");
Object.keys(_termsController).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _termsController[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _termsController[key];
    }
  });
});