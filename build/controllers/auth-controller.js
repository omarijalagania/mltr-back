"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.userRegister=exports.userLogin=exports.logOut=exports.googleFallbackMiddleware=exports.googleAuthMiddleware=exports.getUser=exports.deactivateAccount=exports.confirmDeactivationCode=void 0;var _passport=_interopRequireDefault(require("passport"));var _models=require("../models");var _helpers=require("../helpers");var _mail=require("../mail");var _bcryptjs=_interopRequireDefault(require("bcryptjs"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}const googleAuthMiddleware=_passport.default.authenticate("google",{scope:["profile","email"]});exports.googleAuthMiddleware=googleAuthMiddleware;const googleFallbackMiddleware=_passport.default.authenticate("google",{successRedirect:"https://auth-react.onrender.com/dashboard",failureRedirect:"/login/failed"});exports.googleFallbackMiddleware=googleFallbackMiddleware;const userLogin=async(req,res,next)=>{_passport.default.authenticate("local",function(err,user,info){if(err){return next(err)}if(!user){return res.status(401).json({message:info.message})}req.logIn(user,function(err){if(err){return next(err)}return res.json({_id:user._id,login:user.email,sex:user.sex,birth:user.birth,height:user.height,is_ft_heigth:user.is_ft_heigth,body_type:user.body_type,physical_activities:user.physical_activities,weight:user.weight,is_ft_weight:user.is_ft_weight,status:user.status})})})(req,res,next)};exports.userLogin=userLogin;const getUser=async(req,res)=>{try{res.send(req.user)}catch(error){console.error(`Error setting session data: ${error.message}`);res.status(500).send("Server error")}};exports.getUser=getUser;const logOut=(req,res,next)=>{req.logout(err=>{if(err){return next(err)}})};exports.logOut=logOut;const userRegister=async(req,res)=>{const{login,sex,birth,height,is_ft_heigth,body_type,physical_activities,weight,is_ft_weight}=req.body;try{let code=(0,_helpers.generateCode)();let user;user=await _models.User.findOne({email:login});/* Delete verification code, 1 hour after user registered or updated */setInterval(async()=>{// Execute the update operation
user=await _models.User.findOneAndUpdate({email:login},{code:""})},600000);/* Delete user after one day after inactive status */setInterval(async()=>{var query={status:{$eq:"inactive"}};user=await _models.User.deleteMany(query)},86400000);const salt=await _bcryptjs.default.genSalt(10);// generate hashed password with salt (password = entered password, from request body)
const hashedCode=await _bcryptjs.default.hash(code,salt);if(user){// User already exists, update user with new data
user=await _models.User.findOneAndUpdate({email:login},{email:login,code:hashedCode,sex,birth,height,is_ft_heigth,body_type,physical_activities,weight,is_ft_weight,status:"inactive"},{new:true});(0,_mail.sendCodeConfirmation)(code,user.email);return res.status(201).json({message:"User Updated",user:user.email})}else{// User does not exist, create new user with provided data
user=await _models.User.create({email:login,code:hashedCode,sex,birth,height,is_ft_heigth,body_type,physical_activities,weight,is_ft_weight,status:"inactive"});(0,_mail.sendCodeConfirmation)(code,login);return res.status(200).json({message:"User registered",user:user.email})}}catch(error){res.status(500).json({message:"something went wrong..."})}};exports.userRegister=userRegister;const deactivateAccount=async(req,res)=>{const{login}=req.body;let code=(0,_helpers.generateCode)();try{let user=await _models.User.findOne({email:login});if(!user){return res.status(422).json({message:"user not found"})}if(user){(0,_mail.sendCodeConfirmation)(code,login);user=await _models.User.findOneAndUpdate({email:login},{deactivateCode:code},{new:true});return res.status(200).json({message:"deactivation code sended"})}}catch(error){res.status(500).json({message:"something went wrong..."})}};exports.deactivateAccount=deactivateAccount;const confirmDeactivationCode=async(req,res)=>{const{login,code}=req.body;try{let user=await _models.User.findOne({email:login});if(!user){return res.status(422).json({message:"user not found"})}if(user){if(user.deactivateCode===code){user=await _models.User.findOneAndDelete({email:login});return res.status(200).json({message:"account deactivated"})}}}catch(error){res.status(500).json({message:"something went wrong..."})}};exports.confirmDeactivationCode=confirmDeactivationCode;