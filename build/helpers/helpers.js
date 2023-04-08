"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateCode = void 0;
const generateCode = () => {
  const num = Math.floor(Math.random() * 100000);
  const str = num.toString().padStart(5, "0");
  return str;
};
exports.generateCode = generateCode;