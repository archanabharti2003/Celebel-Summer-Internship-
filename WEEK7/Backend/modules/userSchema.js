require('dotenv').config();

const mongoose=require('mongoose')
const JWT= require('jsonwebtoken');
const bcrypt= require('bcrypt')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required: [true,'user name is required'],
        minLength:[5,'name must be at least of 5 char'],
        maxLength:[50,'Name must be less than 50 char'],
        trim:true
    },
    email:{
        type:String,
        required: [true,'email is required'],
        unique:true,
        lowerCase:true,
        unique:[true,"already registered"]
    },
    password:{
        type:String,
        select:false
    },
    forgetPasswordToken:{
        type: String,
    },
    forgotPasswordExpiryDate:{
        type:Date,
    }
},{timestamps:true});

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next();
    }
    this.password=await bcrypt.hash(this.password, 10);
    return next();
})

userSchema.methods={
    jwtToken(){
        return JWT.sign(
            {id:this._id, email:this.email},
            process.env.SECRET,
            {expiresIn: '24h'}
        )
    }
}

const userModel=mongoose.model('User',userSchema); // database me jo entry hoga uska naam user hoga.
module.exports=userModel;

