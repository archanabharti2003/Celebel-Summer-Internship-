const express=require('express')
const body_parser=require("body-parser")
const mongoose=require('mongoose');

const schema=require("./model/schema");

const app=express()

const PORT=8000;

app.use(body_parser.json());

const URL="mongodb://localhost:27017/crud_app";

mongoose.connect(URL)
.then(()=>{ console.log("Database is Connected.")})
.catch(err=>{ console.log(`error id ${err}`)})




app.listen(PORT,(req,res)=>{
    console.log("Server is started.")
})