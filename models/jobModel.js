const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({

    jobTitle: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    skills: {
        type: Array,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    jobType: {
        type: String,
        required: true
    },
    employerMail: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    status:{
        type:String,
        default:"pending"
    }

})

const jobs = mongoose.model("jobs", jobSchema)

module.exports = jobs