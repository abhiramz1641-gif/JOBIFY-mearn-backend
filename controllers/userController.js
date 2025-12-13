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



    const { email } = req.body

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



// exports.editUserController = async (req, res) => {


//     const body = req.body;
//     //console.log(body);

//     const id = body._id


//     //console.log(id);

//     const { username, email, password, bio }=req.body

//     const picc=req.file?req.file.filename:bio.pic
//     console.log(picc);

//     const newBio={...bio,pic:picc}

//     try {
//         //updated job with that id
//         const updatedUser = await users.findByIdAndUpdate(
//             id,
//             { $set: { username, email, password, bio:newBio } },
//             { new: true }
//         );

//         console.log(updatedUser); 

//         if (!updatedUser) {
//             return res.status(404).json("User not edited");
//         }

//         res.status(200).json(updatedUser);

//     } catch (err) {
//         res.status(500).json(err);
//     }

// }


exports.editUserController = async (req, res) => {
    const { _id, username, email, password } = req.body

    let bio = req.body.bio || {}

    // skills back to normlalll
    if (bio.skills) {
        bio.skills = JSON.parse(bio.skills)
    }

    const pic = req.file ? req.file.filename : bio.pic

    const updatedUser = await users.findByIdAndUpdate(
        _id,
        {
            $set: {
                username,
                email,
                password,
                bio: { ...bio, pic }
            }
        },
        { new: true }
    )

    res.status(200).json(updatedUser)
}








