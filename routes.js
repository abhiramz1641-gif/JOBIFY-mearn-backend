// import express
const express = require('express')

// import the usercontroller
const userController=require('./controllers/userController')

const jobController=require("./controllers/jobController")

const applicationController=require("./controllers/applicationController")
const multerConfig = require('./middleware/multermiddleware')

// const jwtMiddleware = require('./middleware/jwtMiddleware');


//create instance
const route = new express.Router()



// user
route.post("/register",userController.registerController)

route.post("/login",userController.loginController)

route.put("/user-edit",userController.editUserController)

route.post("/get-user",userController.getUserData)



// jobs 

route.post("/add-job",jobController.addJobController)

route.post("/jobs-posted",jobController.getJobsPostedController)

route.post("/jobs-postedById",jobController.getJobsPostedByIdController)

route.get("/all-jobs",jobController.getAllJobsController)

route.put("/admin-job-approval",jobController.adminJobApprovalController)

route.put("/job-edit",jobController.jobEditController)

route.post("/jobs-postedBy-employer",jobController.getJobsPostedByEmployerController)




// application

route.post("/add-application",multerConfig.single('resume'),applicationController.addApplicationController)

route.post("/get-applied-status",applicationController.getApplicationByJobIdApplicantController)

route.get("/get-applications",applicationController.getAllApplicationController)

route.put("/admin-application-approval",applicationController.adminApplicationApprovalController)

route.post("/all-applications-jobId",applicationController.getApplicationCountEmployerController)

route.post("/all-applications-by-user",applicationController.getApplicationByUserController)

route.put("/employer-application-acceptence",applicationController.employerAcceptingApplicationController)

route.put("/employer-application-reject",applicationController.employerRejectingApplicationController)


// mail
// route.post("/forgot-password", userController.forgotPasswordController)
// route.post("/reset-password/:id/:token", userController.resetPasswordController)

module.exports = route