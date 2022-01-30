const express = require('express')
const router = express.Router()
const user = require('./user')
const course = require('./course')



router.use('/user',user)
router.use('/course',course)


module.exports = router