const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true,
    },
    gender: {
        type: String,
        required: true,
    },
    mobile:{
        type: Number,
        required:true,
        minlength:10
    },
    password: {
        type: String,
        required: true,
        minlength:8,
    },
    profile_image:{
        type : String
    },
    courses:[{
        courseId : {
            type: String,
        }
    }]
})

module.exports = mongoose.model('user', userSchema)