const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://127.0.01/c_database'

const app = express()

mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection

con.on('open', () => {
    console.log('connected...')
})

app.use(express.json())

const Router = require('./routes/routes')
app.use('/data',Router)

app.listen(8000, () => {
    console.log('Server started')
})