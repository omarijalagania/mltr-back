"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _express=_interopRequireDefault(require("express"));var _controllers=require("../controllers");var _middlewares=require("../middlewares");var _authMiddleware=require("../middlewares/auth-middleware");var _emailTemplatesController=require("../controllers/email-templates-controller");function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}const router=_express.default.Router();// Google - auth route
router.post("/google-register",_controllers.registerWithGoogle);router.post("/google-login",_controllers.loginWithGoogle);// Apple - auth route
router.post("/apple-register",_controllers.registerWithApple);router.post("/apple-login",_controllers.loginWithApple);// Email & Password
router.post("/login",_controllers.userLogin);router.post("/register",_controllers.userRegister);router.post("/get-code",_controllers.getConfirmationCode);router.post("/deactivate-account",_middlewares.authMiddleware,_controllers.deactivateAccount);router.post("/confirm-deactivate-account",_middlewares.authMiddleware,_controllers.confirmDeactivationCode);router.patch("/update-user",_middlewares.authMiddleware,_controllers.updateUser);router.get("/get-user",_middlewares.authMiddleware,_controllers.getUser);router.get("/user-details/:userId",_middlewares.authMiddleware,_controllers.getUserDetails);//Pro
router.post("/pro",_middlewares.authMiddleware,_controllers.userBuyPro);//Token verify
router.get("/verify",_controllers.tokenVerify);//Admin routes
router.get("/admin/users",_middlewares.authMiddleware,_authMiddleware.isAdmin,_controllers.getAllUsers);router.post("/admin/send-emails",_middlewares.authMiddleware,_authMiddleware.isAdmin,_controllers.bulkEmailSend);router.get("/admin/user-details/:userId",_middlewares.authMiddleware,_authMiddleware.isAdmin,_controllers.getUserDetailsAdmin);router.post("/admin/update-user",_middlewares.authMiddleware,_authMiddleware.isAdmin,_controllers.adminUserUpdate);router.get("/admin/test",_controllers.testFunc);router.get("/admin/email-templates",_middlewares.authMiddleware,_authMiddleware.isAdmin,_emailTemplatesController.getAllEmailTemplates);var _default=router;exports.default=_default;