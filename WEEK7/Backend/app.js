const express= require('express');
const app=express();
const databaseconnection=require('./config/databaseConfig')
const cookieParser=require('cookie-parser');

app.use(express.json());
app.use(cookieParser())

const authRouter=require('./routes/authRoutes')

app.use('/api/auth',authRouter);

app.use('/',(req,res)=>{
    res.status(200).send({data:'JWTAuth server.'});

})

module.exports=app;