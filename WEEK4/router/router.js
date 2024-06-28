const express=require("express");
const router=express.Router();


const controller=require('../controller/controllers')

router.get("/",controller.home);
router.get("/second",controller.second);

module.exports= router;