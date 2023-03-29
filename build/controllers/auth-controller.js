"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userRegister = exports.userLogin = exports.loginWithoutCode = exports.deactivateAccount = exports.confirmDeactivationCode = void 0;
var _models = require("../models");
var _helpers = require("../helpers");
var _mail = require("../mail");
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const loginWithoutCode = async (req, res) => {
  const {
    login,
    sex,
    birth,
    height,
    is_ft_heigth,
    body_type,
    physical_activities,
    weight,
    is_ft_weight
  } = req.body;
  try {
    let user = await _models.User.findOne({
      email: login
    });
    if (user) {
      var _user, _user2;
      // User already exists, update user with new data
      user = await _models.User.findOneAndUpdate({
        email: login
      }, {
        email: login,
        sex,
        birth,
        height,
        is_ft_heigth,
        body_type,
        physical_activities,
        weight,
        is_ft_weight
      }, {
        new: true
      });
      const token = _jsonwebtoken.default.sign({
        _id: (_user = user) === null || _user === void 0 ? void 0 : _user._id,
        name: (_user2 = user) === null || _user2 === void 0 ? void 0 : _user2.email
      }, process.env.JWT_SECRET);
      return res.status(201).json({
        message: "User Updated",
        token
      });
    } else {
      var _user3, _user4;
      user = await _models.User.create({
        email: login,
        sex,
        birth,
        height,
        is_ft_heigth,
        body_type,
        physical_activities,
        weight,
        is_ft_weight
      });
      const token = _jsonwebtoken.default.sign({
        _id: (_user3 = user) === null || _user3 === void 0 ? void 0 : _user3._id,
        name: (_user4 = user) === null || _user4 === void 0 ? void 0 : _user4.email
      }, process.env.JWT_SECRET);
      return res.status(201).json({
        message: "User Created",
        token
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "something went wrong..."
    });
  }
};
exports.loginWithoutCode = loginWithoutCode;
const userRegister = async (req, res) => {
  const {
    login,
    sex,
    birth,
    height,
    is_ft_heigth,
    body_type,
    physical_activities,
    weight,
    is_ft_weight
  } = req.body;
  try {
    let code = (0, _helpers.generateCode)();
    let user;
    user = await _models.User.findOne({
      email: login
    });
    /* Delete verification code, 1 hour after user registered or updated */
    setInterval(async () => {
      // Execute the update operation
      user = await _models.User.findOneAndUpdate({
        email: login
      }, {
        code: ""
      });
    }, 600000);

    /* Delete user after one day after inactive status */
    setInterval(async () => {
      var query = {
        status: {
          $eq: "inactive"
        }
      };
      user = await _models.User.deleteMany(query);
    }, 86400000);
    const salt = await _bcryptjs.default.genSalt(10);
    // generate hashed password with salt (password = entered password, from request body)
    const hashedCode = await _bcryptjs.default.hash(code, salt);
    if (user) {
      // User already exists, update user with new data
      user = await _models.User.findOneAndUpdate({
        email: login
      }, {
        email: login,
        code: hashedCode,
        sex,
        birth,
        height,
        is_ft_heigth,
        body_type,
        physical_activities,
        weight,
        is_ft_weight,
        status: "inactive"
      }, {
        new: true
      });
      (0, _mail.sendCodeConfirmation)(code, user.email);
      return res.status(201).json({
        message: "User Updated, confirmation code sent to email",
        user: user.email
      });
    } else {
      // User does not exist, create new user with provided data
      user = await _models.User.create({
        email: login,
        code: hashedCode,
        sex,
        birth,
        height,
        is_ft_heigth,
        body_type,
        physical_activities,
        weight,
        is_ft_weight,
        status: "inactive"
      });
      (0, _mail.sendCodeConfirmation)(code, login);
      return res.status(200).json({
        message: "User registered, confirmation code sent to email",
        user: user.email
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "something went wrong..."
    });
  }
};
exports.userRegister = userRegister;
const userLogin = async (req, res) => {
  const {
    login,
    code
  } = req.body;
  try {
    const user = await _models.User.findOne({
      email: login
    });
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }
    const isMatch = await _bcryptjs.default.compare(code, user.code);
    if (!isMatch) {
      return res.status(422).json({
        message: "Code is incorrect or expired"
      });
    }

    /* Set user status "active" after successfully logged in */
    await _models.User.findOneAndUpdate({
      email: login
    }, {
      status: "active"
    });
    const token = _jsonwebtoken.default.sign({
      _id: user === null || user === void 0 ? void 0 : user._id,
      name: user === null || user === void 0 ? void 0 : user.email
    }, process.env.JWT_SECRET);
    return res.status(201).json({
      message: "User Logged in",
      token
    });
  } catch (err) {
    res.status(500).json({
      message: "something went wrong..."
    });
  }
};
exports.userLogin = userLogin;
const deactivateAccount = async (req, res) => {
  const {
    login
  } = req.body;
  let code = (0, _helpers.generateCode)();
  try {
    let user = await _models.User.findOne({
      email: login
    });
    if (!user) {
      return res.status(422).json({
        message: "user not found"
      });
    }
    if (user) {
      (0, _mail.sendCodeConfirmation)(code, login);
      user = await _models.User.findOneAndUpdate({
        email: login
      }, {
        deactivateCode: code
      }, {
        new: true
      });
      return res.status(200).json({
        message: "deactivation code sended"
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "something went wrong..."
    });
  }
};
exports.deactivateAccount = deactivateAccount;
const confirmDeactivationCode = async (req, res) => {
  const {
    login,
    code
  } = req.body;
  try {
    let user = await _models.User.findOne({
      email: login
    });
    if (!user) {
      return res.status(422).json({
        message: "user not found"
      });
    }
    if (user) {
      if (user.deactivateCode === code) {
        user = await _models.User.findOneAndDelete({
          email: login
        });
        return res.status(200).json({
          message: "account deactivated"
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "something went wrong..."
    });
  }
};
exports.confirmDeactivationCode = confirmDeactivationCode;