const express=require('express');
const userController=require('../controllers/user.controller');
var userRouter=express.Router();

userRouter.post('/register',userController.register);

module.exports=userRouter;