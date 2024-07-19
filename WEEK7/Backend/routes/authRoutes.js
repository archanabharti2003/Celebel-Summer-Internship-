const express= require('express')
const {signup,signin,getuser,logout}=require('../controllers/authController');
const authRouter=express.Router();
const jwtAuth=require('../middleware/jwtauth')

authRouter.post('/signup',signup);
authRouter.post('/signin',signin);
authRouter.get('/user',jwtAuth,getuser);
authRouter.get('/user',jwtAuth,logout);

module.exports=authRouter;