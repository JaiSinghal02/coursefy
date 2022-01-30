const mongoose = require('mongoose')

const URI='mongodb+srv://JaiSinghal:mongopassword@cluster0.lysxx.mongodb.net/coursefy?retryWrites=true&w=majority'
module.exports = function(){
    mongoose.connect(URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    console.log(`[connect.js] Connected to mongodb database`)
}