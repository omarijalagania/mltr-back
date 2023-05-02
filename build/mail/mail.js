"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendCodeConfirmation = void 0;
var _nodemailer = _interopRequireDefault(require("nodemailer"));
var _index = require("./index");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const sendCodeConfirmation = async (code, email) => {
  const transporter = _nodemailer.default.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });
  const mailOptions = {
    from: `<${process.env.EMAIL_FROM}>`,
    to: email,
    subject: "Confirm your code",
    html: (0, _index.codeConfirmationTemplate)(code)
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};
exports.sendCodeConfirmation = sendCodeConfirmation;