const jobs = require('../models/jobModel');
const { loginController } = require('./userController');


exports.addJobController = async (req, res) => {

    const { jobTitle, company, description, skills, location, salary, jobType, employerMail,experience, status } = req.body
    //console.log(jobTitle, company, description, skills, location, salary, jobType, employerMail,experience);

    try {

        const existingJob = await jobs.findOne({ jobTitle, company, description, skills, location, salary, jobType, employerMail,experience, status })
        if (existingJob) {
            res.status(400).json("Already added job..")
        } else {
            const newJob = new jobs({ jobTitle, company, description, skills, location, salary, jobType, employerMail,experience, status })

            await newJob.save() //save to mongodb
            res.status(200).json(newJob)
        }

    } catch (err) {
        res.status(500).json(err)

    }

}


exports.getAllJobsController = async (req, res) => {

    try {

        const alljobs = await jobs.find()
        //console.log(alljobs);

        if (alljobs.length == 0) {
            res.status(400).json("no jobs present")
        } else {
            res.status(200).json(alljobs)
        }

    } catch (err) {
        res.status(500).json(err)

    }

}


exports.getJobsPostedController = async (req, res) => {

    try {

        const { email } = req.body
        console.log(email);

        const alljobs = await jobs.find()
        console.log(alljobs);

        if (alljobs.length == 0) {
            res.status(400).json("no jobs present")
        } else {
            const jobsPosted = alljobs.filter(job => job.employerMail == email)
            res.status(200).json(jobsPosted)
        }

    } catch (err) {
        res.status(500).json(err)

    }

}

// by id
exports.getJobsPostedByIdController = async (req, res) => {

    try {

        const reqBoby = req.body
        id = reqBoby.id
        console.log(id);

        const job = await jobs.findOne({ _id: id })
        console.log(job);


        if (job) {
            res.status(200).json(job)
        } else {
            res.status(400).json("no jobs present")

        }

    } catch (err) {
        res.status(500).json(err)

    }

}

exports.deleteJobController = async (req, res) => {

    try {

        const reqBoby = req.body
        id = reqBoby.id
        console.log(id);

        const job = await jobs.findByIdAndDelete({ _id: id })
        //console.log(job);

        if (job) {
            res.status(200).json("deleted")
        } else {
            res.status(400).json("no job")
        }

    } catch (err) {
        res.status(500).json(err)

    }

}

exports.adminJobApprovalController = async (req, res) => {


    const { id } = req.body;
    console.log(req.body);

    console.log(id);


    try {
        //updated jobs by idd
        const updatedJob = await jobs.findByIdAndUpdate(
            id,
            { $set: { status: "approved" } },
            { new: true }
        );

        if (!updatedJob) {
            return res.status(404).json("Job not found");
        }
        const newAlljobs = await jobs.find()

        res.status(200).json(newAlljobs);

    } catch (err) {
        res.status(500).json(err);
    }



}

exports.jobEditController = async (req, res) => {


    const body = req.body;
    console.log(body);

    const id = body._id

    const {jobTitle,company,description,skills,location,salary,jobType,employerMail,experience,status}=req.body
    console.log(jobTitle,company,description,skills,location,salary,jobType,employerMail,experience,status);
    

    // console.log(id);

    try {
        //updated job with that id
        const updatedJob = await jobs.findByIdAndUpdate(
            id,
            { $set: { jobTitle, company, description, skills, location, salary, jobType, employerMail,experience, status } },
            { new: true }
        );

        console.log(updatedJob);

        if (!updatedJob) {
            return res.status(404).json("Job not edited");
        }

        res.status(200).json(updatedJob);

    } catch (err) {
        res.status(500).json(err);
    }


}

exports.getJobsPostedByEmployerController = async (req, res) => {

    try {

        const reqBoby = req.body
        employerMail = reqBoby.mail
        console.log(employerMail);

        const job = await jobs.find({employerMail })
        console.log(job);

        if (job) {
            res.status(200).json(job)
        } else {
            res.status(400).json("no jobs present")

        }

    } catch (err) {
        res.status(500).json(err)

    }

}

