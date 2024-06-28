const bodyParser = require("body-parser");
const bodyparser=require("body-parser")
const express=require("express");
const app=express();
const routes=require("./router/router");


//body-parser package we included so express can use the information coming from the http request
app.use(bodyparser.urlencoded({extended:false}));

app.use('/',routes)


const PORT=8888;

app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}.`)
})