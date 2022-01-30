const express = require('express')
const app = express()
const api = require('./controller/index')
const connect = require('./controller/connect')


app.use(express.json())
app.use('/api',api)

const PORT = process.env.PORT || 4000
app.get('/',(req,res)=>{
    res.send("API FOR COURSEFY")
})
app.listen(PORT,()=>{
    console.log(`[index.js] Server listening on port ${PORT}`)
    connect()
})