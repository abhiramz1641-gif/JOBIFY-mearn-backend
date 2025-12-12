// import express
const express = require('express')

// import the usercontroller
const userController=require('./controllers/userController')

const jobController=require("./controllers/jobController")

const applicationController=require("./controllers/applicationController")


const multerConfig = require('./middleware/multermiddleware')

const jwtMiddleware = require('./middleware/jwtMiddleware');

const jwtAdminMiddleware = require('./middleware/jwtAdminMidlleware');


//create instance
const route = new express.Router()



// user
route.post("/register",userController.registerController)

route.post("/login",userController.loginController)

route.put("/user-edit",jwtMiddleware,userController.editUserController)

route.post("/get-user",jwtMiddleware,userController.getUserData)



// jobs 

route.post("/add-job",jwtMiddleware,jobController.addJobController)

route.post("/jobs-posted",jwtMiddleware,jobController.getJobsPostedController)

route.post("/jobs-postedById",jobController.getJobsPostedByIdController)

route.get("/all-jobs",jwtMiddleware,jobController.getAllJobsController)

route.put("/job-edit",jobController.jobEditController)

route.post("/jobs-postedBy-employer",jobController.getJobsPostedByEmployerController)




// application

route.post("/add-application",multerConfig.single('resume'),applicationController.addApplicationController)

route.post("/get-applied-status",applicationController.getApplicationByJobIdApplicantController)

route.get("/get-applications",jwtMiddleware,applicationController.getAllApplicationController)

route.post("/all-applications-jobId",applicationController.getApplicationCountEmployerController)

route.post("/all-applications-by-user",jwtMiddleware,applicationController.getApplicationByUserController)

route.put("/employer-application-acceptence",applicationController.employerAcceptingApplicationController)

route.put("/employer-application-reject",applicationController.employerRejectingApplicationController)


//for admin only 
route.post("/get-user-admin",jwtAdminMiddleware,userController.getUserData)

route.get("/all-jobs-admin",jwtAdminMiddleware,jobController.getAllJobsController)

route.get("/get-applications-admin",jwtAdminMiddleware,applicationController.getAllApplicationController)

route.put("/admin-application-approval",jwtAdminMiddleware,applicationController.adminApplicationApprovalController)

route.put("/admin-job-approval",jwtAdminMiddleware,jobController.adminJobApprovalController)




// mail
// route.post("/forgot-password", userController.forgotPasswordController)
// route.post("/reset-password/:id/:token", userController.resetPasswordController)

module.exports = route