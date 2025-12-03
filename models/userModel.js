// import mongoose
const mongoose = require('mongoose')

// creating schema

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    bio:{
        type:Object,
        default:{
            type:""
        }
    },

    // mail
    // resetPasswordToken: String,
    // resetPasswordExpires: Date
})

// create modal
const users=mongoose.model("users",userSchema)

module.exports=users