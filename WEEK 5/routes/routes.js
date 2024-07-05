const express = require('express')
const router = express.Router()
const schema = require('../models/db')


router.get('/', async(req,res) => {
    try{
           const data = await schema.find()
           res.json(data)
    }catch(err){
        res.send('Error ' + err)
    }
})

router.get('/:id', async(req,res) => {
    try{
           const data = await schema.findById(req.params.id)
           res.json(data)
    }catch(err){
        res.send('Error ' + err)
    }
})


router.post('/', async(req,res) => {
    const data = new schema({
        name: req.body.name,
        tech: req.body.tech,
        sub: req.body.sub
    })

    try{
        const a1 =  await data.save() 
        res.json(a1)
    }catch(err){
        res.send('Error')
    }
})

router.patch('/:id',async(req,res)=> {
    try{
        const data = await schema.findById(req.params.id) 
        data.sub = req.body.sub
        const a1 = await data.save()
        res.json(a1)   
    }catch(err){
        res.send('Error')
    }

})

module.exports = router