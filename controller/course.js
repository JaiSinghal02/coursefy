const express = require('express')
const router = express.Router()

const User = require('../models/user')
const Course = require('../models/course')

const constant = require('../constant/constant')

router.post('/enroll', async (req, res) =>{
    const email = req.body.email
    const courseName = req.body.courseName
    try{
        const user = await User.findOne({email:email})
        if(!user) return res.status(400).send(`Invalid user email`)

        const searchFilter = {name: courseName, 'enrolled.id': {$ne: user._id}, 'waitlist.id': {$ne: user._id}}
        const update = { $push: { enrolled: {id:user._id ,enrolledAt: new Date()} }}

        const course = JSON.parse(JSON.stringify(await Course.findOneAndUpdate(searchFilter,update,{new:true}).select({__v:0})))
        const userId = user._id.toString()
        var index = course.enrolled.findIndex( el => el.id===userId )
        if(index!==-1){
            var list = 'Enrolled list'
            var enrolledAt = course.enrolled[index].enrolledAt
        }
        else{
            index = course.waitlist.findIndex( el => el.id===userId )
            list = 'Wait list'
            enrolledAt = course.waitlist[index].enrolledAt
        }
        var data = {enrolledAt,list}
        res.send(data)
    }
    catch(err){
        console.log(err)
        res.status(400).send(err)
    }
})

router.post('/cancel', async (req,res) =>{
    const courseName = req.body.courseName
    const email = req.body.email
    try{
        const user = await User.findOne({email:email})
        if(!user) return res.status(400).send(`Invalid user email`)

        const searchFilter = {name: courseName}

        var course = JSON.parse(JSON.stringify(await Course.findOne(searchFilter).select({__v:0})))
        const userId = user._id.toString()
        var index = course.enrolled.findIndex( el => el.id===userId )
        if(index!==-1){
            var enrolledAt = course.enrolled[index].enrolledAt
            var list = 'enrolled'
        }
        else{
            index = course.waitlist.findIndex( el => el.id===userId )
            if(index===-1) return res.status(400).send('User not enrolled in this course')
            enrolledAt = course.waitlist[index].enrolledAt
            list = 'waitlist'
        }
        enrolledAt = new Date(enrolledAt)
        const diffInMin = Math.floor((Date.now() - enrolledAt) / (1000 * 60))
        if(diffInMin>30) return res.status(400).send(`Cancellation denied. ${diffInMin} minutes have elapsed since enrollment.`)
        
        const update = { $pull : { [list]: {id: user._id}  }}
        course = await Course.findOneAndUpdate(searchFilter,update,{new:true})
        return res.send('User successfully un-enrolled from course')
    }
    catch(err){
        console.log(err)
        res.status(400).send(err)
    }

})

router.get('/information', async(req,res)=>{
    const courseName = req.body.courseName
    try{
        var course= await Course.find({name:courseName}).select({__v:0})
        if(!course) return res.status(400).send('No course with given name')
        course = course[0]

        var data = {}

        data.courseId = course._id
        data.courseName = course.name
        data.enrolled = course.enrolled.map((el)=>{
            return {
                userId: el.id,
                enrolledAt: el.enrolledAt
            }
        })
        data.waitlist = course.waitlist.map((el)=>{
            return{
                userId: el.id,
                enrolledAt: el.enrolledAt
            }
        })
        res.send(data)
    }
    catch(err){
        console.log(err)
        res.status(400).send(err)
    }
})

router.get('/available', async(req,res)=>{
    try{
        const course = await Course.find().select({__v:0})
        const data = []
        course.forEach((obj)=>{
            let temp = {}
            temp.courseId = obj._id
            temp.courseName = obj.name
            temp.enrolled = `${obj.enrolled.length} / ${constant.COURSE_SIZE_LIMIT}`
            temp.waitlist = obj.waitlist.length
            data.push(temp)
        })
        res.send(data)
    }
    catch(err){
        res.status(400).send(err)
    }
})


router.post('/new', async (req,res) =>{
    const courseName = req.body.courseName
    try{
        const course = new Course({
            name: courseName
        })
        await course.save()
        res.send(course)
    }
    catch(err){
        console.log(err)
        res.status(400).send(err)
    }
})

module.exports = router