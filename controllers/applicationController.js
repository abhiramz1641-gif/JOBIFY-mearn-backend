const applications = require("../models/applicationModel");

// add application
exports.addApplicationController = async (req, res) => {

    const { firstName, lastName, emailId, phoneNumber, jobId, userMail, status, score } = req.body;

    // Uploaded PDF file from Multer
    const resume = req.file ? req.file.filename : null;

    if (!resume) {
        return res.status(400).json("Resume PDF is required");
    }
    try {
        // Check if user already applied for same job
        const existingApplication = await applications.findOne({ jobId, userMail });

        if (existingApplication) {
            return res.status(500).json("User already applied for this job");
        }

        const newApplication = new applications({
            firstName,
            lastName,
            emailId,
            phoneNumber,
            resume,
            jobId,
            userMail,
            status,
            score
        });

        await newApplication.save();
        res.status(200).json(newApplication);

    } catch (err) {
        res.status(500).json(err);
    }
};

// application by jobid
exports.getApplicationByJobIdApplicantController = async (req, res) => {

    const { jobId, userMail } = req.body;

    try {
        const existingApplication = await applications.findOne({ jobId, userMail });

        if (!existingApplication) {
            res.status(500).json("no application found");
        }else{
            res.status(200).json("already applied");
        }

        

    } catch (err) {
        res.status(500).json(err);
    }
};

// all appplication
exports.getAllApplicationController = async (req, res) => {

    try {
        const allApplications = await applications.find();

        res.status(200).json(allApplications);

    } catch (err) {
        res.status(500).json(err);
    }

}

// admin approval
exports.adminApplicationApprovalController = async (req, res) => {

    const { id } = req.body;

    try {
        const updated = await applications.findByIdAndUpdate(
            id,
            { status: "approved" },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json("Application not found");
        }

        const allApplications = await applications.find();
        res.status(200).json(allApplications);

    } catch (err) {
        res.status(500).json(err);
    }
};

// application count
exports.getApplicationCountEmployerController = async (req, res) => {

    const { jobId } = req.body;

    try {
        const apps = await applications.find({ jobId });
        res.status(200).json(apps);

    } catch (err) {
        res.status(500).json(err);
    }
};

// application by userMail
exports.getApplicationByUserController = async (req, res) => {

    const { userMail } = req.body;

    try {
        const apps = await applications.find({ userMail });

        res.status(200).json(apps);

    } catch (err) {
        res.status(500).json(err);
    }
};

// employer accepting application
exports.employerAcceptingApplicationController = async (req, res) => {

    const { id, jobId } = req.body;

    try {
        const updated = await applications.findByIdAndUpdate(
            id,
            { status: "approved-accepted" },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json("Application not found");
        }

        const apps = await applications.find({ jobId });
        res.status(200).json(apps);

    } catch (err) {
        res.status(500).json(err);
    }
};

// employer rejecting application
exports.employerRejectingApplicationController = async (req, res) => {

    const { id, jobId } = req.body;

    try {
        const updated = await applications.findByIdAndUpdate(
            id,
            { status: "approved-rejected" },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json("Application not found");
        }

        const apps = await applications.find({ jobId });
        res.status(200).json(apps);

    } catch (err) {
        res.status(500).json(err);
    }
};

// delete application
exports.deleteApplicationController = async (req, res) => {

    try {

        const reqBoby = req.body
        id = reqBoby.id
        console.log(id);

        const app = await applications.findByIdAndDelete({ _id: id })
        //console.log(job);

        if (app) {
            res.status(200).json("deleted")
        } else {
            res.status(400).json("no application")
        }

    } catch (err) {
        res.status(500).json(err)

    }

}