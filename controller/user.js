const express = require('express')
const router = express.Router()

const User = require('../models/user')


router.post('/signup', async(req,res)=>{
    const name = req.body.name
    const email = req.body.email
    const user = new User({
        name,
        email
    })
    try{
        await user.save()
        res.send(user)
    }
    catch(err){
        res.status(400).send(err)
    }
})

router.get('/',async(req,res)=>{
    try{
        const user = await User.find().select({__v:0})
        return res.send(user)
    }
    catch(err){
        console.log(err)
        res.status(400).send(err)
    }
})

// router.post('/signin', async(req,res)=>{
//     const email = req.body.email
//     try{
//         const user = await User.find({email:email})
//         if(!user) return res.status(403).send(`Invalid Email`)
//         res.send(`Valid Email`)
//     }
//     catch(err){
//         res.status(400).send(err)
//     }
// })

module.exports = router