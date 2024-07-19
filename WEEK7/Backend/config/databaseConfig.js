const mongoose=require('mongoose');
require('dotenv').config()
const URL= process.env.URL||"mongodb://localhost:27017/JWRAuth_dataset";

const databaseconnection=mongoose.connect(URL)
.then((req,res)=>{
    console.log("data base is connected");
})
.catch(err=>{ console.log(err)})

module.exports=databaseconnection;