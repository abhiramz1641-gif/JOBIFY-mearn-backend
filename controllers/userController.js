// import model
const users = require("../models/userModel")

// import jwt 
const jwt = require('jsonwebtoken')


// mail
// const bcrypt = require("bcryptjs")

// const crypto = require("crypto")
// const nodemailer = require("nodemailer")


// register
exports.registerController = async (req, res) => {
    // logic
    const { username, email, password, bio } = req.body
    console.log(username, email, password, bio);

    try {

        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(400).json("Already registered user..")
        } else {
            const newUser = new users({
                username, email, password, bio
            })

            // const hash = await bcrypt.hash(password, 10)

            // const newUser = new users({
            //     username,
            //     email,
            //     password: hash,
            //     bio
            // })

            await newUser.save() //save to mongodb
            res.status(200).json(newUser)
        }

    } catch (err) {
        res.status(500).json(err)

    }

}

// login
exports.loginController = async (req, res) => {
    // logic
    const { email, password } = req.body
    console.log(email, password);

    // errr handling
    try {

        const existingUser = await users.findOne({ email })
        if (existingUser) {
            // mail
            // const isMatch = await bcrypt.compare(password, existingUser.password)
            // if (isMatch)
            if (existingUser.password == password) {
                // JWT encryption 
                const token = jwt.sign({ userMail: existingUser.email }, process.env.sk)
                res.status(200).json({ existingUser, token })
            } else {
                res.status(400).json("Password does not match")
            }
        } else {
            res.status(400).json("User does not exist")
        }

    } catch (err) {
        res.status(500).json(err)

    }

}

exports.getUserData = async (req, res) => {

    

    const {email} = req.body

    try {

        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(200).json({ existingUser })
        } else {
            res.status(400).json("User does not exist")
        }

    } catch (err) {
        res.status(500).json(err)

    }

}

exports.editUserController = async (req, res) => {


    const body = req.body;
    //console.log(body);

    const id = body._id
    
    //console.log(id);

    const { username, email, password, bio }=req.body

    try {
        //updated job with that id
        const updatedUser = await users.findByIdAndUpdate(
            id,
            { $set: { username, email, password, bio } },
            { new: true }
        );

        console.log(updatedUser); 

        if (!updatedUser) {
            return res.status(404).json("User not edited");
        }

        res.status(200).json(updatedUser);

    } catch (err) {
        res.status(500).json(err);
    }

}



// mail

// exports.forgotPasswordController = async (req, res) => {
//     const { email } = req.body

//     const user = await users.findOne({ email })
//     if (!user) {
//         return res.json("If email exists, link sent")
//     }

//     const token = crypto.randomBytes(32).toString("hex")
//     const tokenHash = crypto.createHash("sha256").update(token).digest("hex")

//     user.resetPasswordToken = tokenHash
//     user.resetPasswordExpires = Date.now() + 3600000
//     await user.save()

//     const link = `http://localhost:3000/reset-password/${user._id}/${token}`

//     const transporter = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//             user: "your@gmail.com",
//             pass: "app_password"
//         }
//     })

//     await transporter.sendMail({
//         to: user.email,
//         subject: "Password Reset",
//         html: `<a href="${link}">${link}</a>`
//     })

//     res.json("If email exists, link sent")
// }

// exports.resetPasswordController = async (req,res)=>{
//     const {id,token} = req.params
//     const {password} = req.body

//     const tokenHash = crypto.createHash("sha256").update(token).digest("hex")

//     const user = await users.findOne({
//         _id:id,
//         resetPasswordToken: tokenHash,
//         resetPasswordExpires: {$gt:Date.now()}
//     })

//     if(!user){
//         return res.status(400).json("Invalid or expired link")
//     }

//     const hash = await bcrypt.hash(password,10)
//     user.password = hash
//     user.resetPasswordToken = undefined
//     user.resetPasswordExpires = undefined

//     await user.save()

//     res.json("Password reset successful")
// }
