const mongoose = require('mongoose')


const User = mongoose.model('User', new mongoose.Schema({
    email: {
        type:String,
        unique:true,
        required:true
    },
    name:{
        type:String,
        required:true
    }
}))

module.exports = User