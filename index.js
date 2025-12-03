// import express library 
const express = require('express')

// import dotenv
require('dotenv').config()

// import cors
const cors = require('cors')

// import route
const route= require('./routes')

// import DB file
require('./dBconnection')

// create the server 
const jobifyServer = express()

// server using cors
jobifyServer.use(cors())
// parse json - middleware
jobifyServer.use(express.json())
// use route
jobifyServer.use(route)

// create port 
PORT = 4000 || process.env.PORT

jobifyServer.listen(PORT,()=>{
    console.log(`Server running in ${PORT}`);
    
})

jobifyServer.get("/",(req,res)=>{
    res.status(200).send("<h1>Jobfy Server Started...</h1>")
})