// import mongoose
const mongoose = require('mongoose')

// creating schema

const applicationSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    emailId:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    resume:{
        type:String,
        default:""
    },
    jobId:{
        type:String,
        required:true
    },
    userMail:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:""
    },
    score:{
        type:String,
        default:""
    }

})

// create modal
const applications=mongoose.model("applications",applicationSchema)

module.exports=applications
