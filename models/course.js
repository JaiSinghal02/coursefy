const mongoose = require('mongoose')
const constant = require('../constant/constant')

const courseSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true
    },
    enrolled:[{
                id:{
                    type: String,
                },
                enrolledAt:{
                    type: Date
                },
                _id:false
        }],
    waitlist:[{
        id:{
            type: String,
        },
        enrolledAt:{
            type: Date
        },
        _id:false
    }]
})

function compare(a,b){
    if(a.enrolledAt <= b.enrolledAt) return -1;
    return 1;
}
courseSchema.pre('findOneAndUpdate', async function(next){
    try{
        const doc = await this.model.findOne(this.getQuery())
        if(!doc) return next('User already subscribed for course')

        if(this._update['$push']){
            const enrolledList = doc.enrolled
            if(enrolledList.length < constant.COURSE_SIZE_LIMIT) return next();
            const data = this._update['$push'].enrolled
            this._update['$push'] = { waitlist: {id: data.id, enrolledAt: data.enrolledAt}}
        }
        if(this._update['$pull']){
            const data = this._update['$pull']
            const list = Object.keys(data)[0]
            if(list==='enrolled'){
                if(doc.waitlist.length===0) return next()
                const objectToBeMoved = doc.waitlist.sort(compare)[0]
                const index = doc.enrolled.findIndex(el => {
                    return ((el.id.toString()) === (data.enrolled.id.toString()))
                })
                this.update({'enrolled.id': doc.enrolled[index].id}, { $set: { 'enrolled.$.id' : objectToBeMoved.id, 'enrolled.$.enrolledAt': new Date()}  });
                this._update['$pull'] = {waitlist: {id: objectToBeMoved.id}}
            }
        }
        return next()
    }
    catch(err){
        console.log(`[models/course.js] ${err}`)
        next(err)
    }
})

const course = mongoose.model('Course',courseSchema)


module.exports = course