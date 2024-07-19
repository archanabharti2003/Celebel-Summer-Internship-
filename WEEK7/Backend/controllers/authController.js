const usermodel=require('../modules/userSchema')
const emailValidator=require('email-validator')
const bcrypt=require('bcrypt')

const signup=async (req,res,next)=>{
    const {name, email,password,confirmpassword}=req.body;
    console.log(name, email,password,confirmpassword);

    if(!name || !email || !password || !confirmpassword){
        return res.status(400).json({
            success: false,
            message: "Every field is required"
        })
    }

    const validEmail = emailValidator.valid(email);

    if(!validEmail){
        return res.status(400).json({
            success:false,
            message:"please provide a valid email id."
        })
    }

    if(password!=confirmpassword){
        return res.status(400).json({
            success:false,
            message:"password and confirm password doesn't match."
        })
    }

    try{
        const userInfo = usermodel(req.body);
        const result= await userInfo.save()

        return res.status(200).json({
            data:result
        })
    }catch(e){
        if(e.code=== 11000){// ye btata hai ki account already exists
            res.status(400).json({
                success:false,
                message:"Email already exists."
            })
        }
        res.status(400).json({
            success:false,
            message:e.message
        })
    }

    
}

const signin=async(req,res)=>{

    const {email, password}=req.body;

    if(!email || !password){
        return res.status(400).json({
            success:false,
            message:"every field is mandatory"
        })
    }

    const user= await usermodel.findOne({email}).select('+password');

    if(!user || !(await bcrypt.compare(password,user.password))){
        return res.status(400).json({
            success:false,
            message:"Invalid Credentials."
        })
    }

    try{
        const token=user.jwtToken();
        user.password=undefined;

        const cookieOption={
            maxAge: 24*60*60*1000,
            httpOnly:true
        };

        res.cookie("token",token,cookieOption);
        res.status(200).json({
            success:true,
            data:user
        })
    }catch(e){
        res.status(400).json({
            success:false,
            message:e.message
        })
    }
}

const getuser=async(req,res,next)=>{

    const userId=req.user.id;

    try{
        const user= await usermodel.findOne(userId);
        return res.status(200).json({
            success:true,
            data:user
        });
    }catch(e){
        return res.status(400).json({
            success:false,
            data:e.message
        });
    }
}

const logout=(req,res)=>{
    try{
        const cookieOption={
            expires: new Date(),
            httpOnly: true
        };

        res.cookie('token',null,cookieOption);

        res.status(200).json({
            success:true,
            message:"Logged Out"
        })
    }catch(e){
        res.status(400).json({
            success:false,
            message:"e.message"
        })
    }
}

module.exports={
    signup,
    signin,
    getuser,
    logout
}