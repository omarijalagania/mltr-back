"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _mail = require("./mail");
Object.keys(_mail).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _mail[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mail[key];
    }
  });
});
var _template = require("./template");
Object.keys(_template).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _template[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _template[key];
    }
  });
});