// import express
const express = require('express')

// import the usercontroller
const userController=require('./controllers/userController')

const jobController=require("./controllers/jobController")

//create instance
const route = new express.Router()

// path to register 
route.post("/register",userController.registerController)

route.post("/login",userController.loginController)

route.post("/add-job",jobController.addJobController)

route.post("/jobs-posted",jobController.getJobsPostedController)

route.post("/jobs-postedById",jobController.getJobsPostedByIdController)

route.get("/all-jobs",jobController.getAllJobsController)

route.put("/admin-job-approval",jobController.adminJobApprovalController)

route.put("/job-edit",jobController.jobEditController)


// mail
// route.post("/forgot-password", userController.forgotPasswordController)
// route.post("/reset-password/:id/:token", userController.resetPasswordController)

module.exports = route