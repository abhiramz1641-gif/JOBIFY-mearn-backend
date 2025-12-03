const jobs = require('../models/jobModel');
const { loginController } = require('./userController');


exports.addJobController = async (req, res) => {

    const { jobTitle, company, description, skills, location, salary, jobType, employerMail, status } = req.body
    console.log(jobTitle, company, description, skills, location, salary, jobType, employerMail);

    try {

        const existingJob = await jobs.findOne({ jobTitle, company, description, skills, location, salary, jobType, employerMail, status })
        if (existingJob) {
            res.status(400).json("Already added job..")
        } else {
            const newJob = new jobs({ jobTitle, company, description, skills, location, salary, jobType, employerMail, status })

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
        console.log(alljobs);

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

    const {jobTitle,company,description,skills,location,salary,jobType,employerMail,status}=req.body
    console.log(jobTitle,company,description,skills,location,salary,jobType,employerMail,status);
    

    // console.log(id);

    try {
        //updated job with that id
        const updatedJob = await jobs.findByIdAndUpdate(
            id,
            { $set: { jobTitle, company, description, skills, location, salary, jobType, employerMail, status } },
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


// Replace (update entire document)
// - This replaces the whole document with the payload sent in `req.body`.
// - It preserves the document _id (we delete any incoming _id from the body).
// - runValidators ensures schema validation runs on replacement.
// Note: Replace will remove any fields not provided in the replacement object.
exports.replaceJobController = async (req, res) => {
    try {
        const payload = { ...req.body };
        const id = payload._id || req.params.id || req.body.id;

        if (!id) return res.status(400).json('Missing job id');

        // Ensure we don't overwrite the _id field
        delete payload._id;

        // Replace the entire document with `payload` (must include all required fields)
        const replaced = await jobs.findOneAndReplace(
            { _id: id },
            payload,
            { new: true, runValidators: true }
        );

        if (!replaced) return res.status(404).json('Job not found');

        res.status(200).json(replaced);
    } catch (err) {
        res.status(500).json(err);
    }
};