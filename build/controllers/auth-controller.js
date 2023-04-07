"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userRegister = exports.userLogin = exports.loginWithoutCodeGoogle = exports.loginWithoutCodeApple = exports.getConfirmationCode = exports.deactivateAccount = exports.confirmDeactivationCode = void 0;
var _models = require("../models");
var _helpers = require("../helpers");
var _mail = require("../mail");
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const loginWithoutCodeGoogle = async (req, res) => {
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
        message: "User Updated and logged in.",
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
        message: "User Registered and logged in.",
        token,
        _id: user._id,
        email: user.email,
        sex: user.sex,
        birth: user.birth,
        height: user.height,
        is_ft_heigth: user.is_ft_heigth,
        body_type: user.body_type,
        physical_activities: user.physical_activities,
        weight: user.weight,
        is_ft_weight: user.is_ft_weight
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong..."
    });
  }
};
exports.loginWithoutCodeGoogle = loginWithoutCodeGoogle;
const loginWithoutCodeApple = async (req, res) => {
  const {
    login,
    appleToken,
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
      appleToken
    });
    if (user) {
      var _user5, _user6, _user7;
      // User already exists, update user with new data
      user = await _models.User.findOneAndUpdate({
        appleToken
      }, {
        email: login,
        appleToken,
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
        _id: (_user5 = user) === null || _user5 === void 0 ? void 0 : _user5._id,
        name: (_user6 = user) === null || _user6 === void 0 ? void 0 : _user6.email,
        appleToken: (_user7 = user) === null || _user7 === void 0 ? void 0 : _user7.appleToken
      }, process.env.JWT_SECRET);
      return res.status(201).json({
        message: "User Updated and logged in.",
        token
      });
    } else {
      var _user8, _user9, _user10;
      user = await _models.User.create({
        email: login,
        appleToken,
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
        _id: (_user8 = user) === null || _user8 === void 0 ? void 0 : _user8._id,
        name: (_user9 = user) === null || _user9 === void 0 ? void 0 : _user9.email,
        appleToken: (_user10 = user) === null || _user10 === void 0 ? void 0 : _user10.appleToken
      }, process.env.JWT_SECRET);
      return res.status(201).json({
        message: "User Registered and logged in.",
        token,
        _id: user._id,
        email: user.email,
        sex: user.sex,
        birth: user.birth,
        height: user.height,
        is_ft_heigth: user.is_ft_heigth,
        body_type: user.body_type,
        physical_activities: user.physical_activities,
        weight: user.weight,
        is_ft_weight: user.is_ft_weight
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong..."
    });
  }
};
exports.loginWithoutCodeApple = loginWithoutCodeApple;
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
      message: "Something went wrong..."
    });
  }
};
exports.userRegister = userRegister;
const getConfirmationCode = async (req, res) => {
  const {
    login
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
        status: "inactive"
      }, {
        new: true
      });
      (0, _mail.sendCodeConfirmation)(code, user.email);
      return res.status(201).json({
        message: "Confirmation code sent to email.",
        user: user.email
      });
    } else {
      // User does not exist, send message
      return res.status(404).json({
        message: "No user found, please register."
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong..."
    });
  }
};
exports.getConfirmationCode = getConfirmationCode;
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
      token,
      _id: user._id,
      email: user.email,
      sex: user.sex,
      birth: user.birth,
      height: user.height,
      is_ft_heigth: user.is_ft_heigth,
      body_type: user.body_type,
      physical_activities: user.physical_activities,
      weight: user.weight,
      is_ft_weight: user.is_ft_weight
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong..."
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
      return res.status(404).json({
        message: "User not found"
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
        message: "Deactivation code sent to email"
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong..."
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
      return res.status(404).json({
        message: "User not found"
      });
    }
    if (user) {
      if (user.deactivateCode === code) {
        user = await _models.User.findOneAndDelete({
          email: login
        });
        return res.status(200).json({
          message: "Account deactivated"
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong..."
    });
  }
};
exports.confirmDeactivationCode = confirmDeactivationCode;