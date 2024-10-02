require("dotenv").config()
const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const fetchuser = require('../middleware/fetchuser');

router.get('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "User founded",
            success: true,
            user: user
        });
    }
    catch (err) {
        console.error("Error on fetching user: " + err);
        return res.status(500).json({
            message: "500 Internal Server Error",
            success: false
        });
    }
})

router.post('/signup', [
    body('name', 'Name should be at least 3 characters').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    body('contactno', 'Contact number must be 10 digits').isLength({ min: 10, max: 10 }).isNumeric(),
    body('dob', 'Date of Birth is required').notEmpty(),
    body('gender', 'Gender is required').notEmpty(),
    body('city', 'City is required').notEmpty(),
    body('state', 'State is required').notEmpty(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array())
        return res.status(400).json({
            message: errors.array()[0].msg,
            success: false
        });
    }

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).send({
                message: "Email already exists!",
                success: false
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            contactno: req.body.contactno,
            dob: req.body.dob,
            gender: req.body.gender,
            city: req.body.city,
            state: req.body.state
        });

        const data = {
            user: {
                id: user.id,
                name: user.name
            }
        };
        const authToken = jwt.sign(data, process.env.SECRET);

        success = true;
        res.status(200).json({
            message: "Registration successfully completed!",
            success: success,
            authToken: authToken
        });
    } catch (error) {
        console.error("Error on signup: ", error);
        return res.status(500).send({
            message: "500 Internal Server Error",
            success: false
        });
    }
});

router.post('/signin', [
    body('email','Password can not Empty').isEmail(),
    body('password', 'Password can not Empty').exists(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array())
        return res.status(400).json({
            message: errors.array()[0].msg
        });
    }
    
    console.log(req.body);
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({
                message: "User Not Found!",
                success: false
            })
        }
        const passwordCheck = await bcrypt.compare(password, user.password);
        if (!passwordCheck) {
            return res.status(400).send({
                message: "Incorrect Password!",
                success: false
            });
        }
        const userToken = {
            user: {
                id: user.id,
                name: user.name
            }
        }
        const authToken = jwt.sign(userToken, process.env.SECRET);
        success = true;

        req.session.user = userToken.user;

        res.status(200).json({
            message: "Successfully Logged in!",
            success: true,
            authToken: authToken
        });
    } catch (error) {
        console.log("Error on signin: " + error);
        return res.status(500).json({
            message: "505 Internal Server Error",
            success: false
        });
    }
});

router.put('/changepassword', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                message: "User not found!",
                success: false
            })
        }
        const { oldpassword, newpassword, cnfpassword } = req.body;
        const passwordCheck = await bcrypt.compare(oldpassword, user.password);

        if (!passwordCheck) {
            return res.status(402).json({
                message: "Current password not match!",
                success: false
            })
        }
        if (newpassword !== cnfpassword) {
            return res.status(401).json({
                message: "Confrim password not match!",
                success: false
            })
        }
        const salt = await bcrypt.genSalt(10);
        const newpass = await bcrypt.hash(newpassword, salt);
        await User.findByIdAndUpdate(user._id, { password: newpass }, { new: true });
        return res.status(200).json({
            message: "Password Changed Successfully",
            success: true
        })

    } catch (error) {
        console.log("Can't change password: " + error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
})

// Configuring nodemailer with your SMTP settings
const transporter = nodemailer.createTransport({
    service: 'gmail', // false for TLS - as a boolean not string
    host: 'smtp@gmail.com',
    port: 587,
    auth: {
        user: 'mapaarup@gmail.com', // Your email address
        pass: 'pely hrod txpk jwee'
    }
});

// Generate OTP function
function generatePassword() {
    return randomstring.generate({
        length: 7
    });
}

router.put('/forgetpassword', async (req, res) => {
    try {
        const email = req.body.email;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.json({
                message: "User Not found",
                success: false
            })
        }
        const newpass = generatePassword();

        // Compose email
        const mailOptions = {
            from: 'mapaarup@gmail.com',
            to: email,
            subject: 'Password Reset',
            html: `<p>Your password has been reset and new password is: <strong>${newpass}</strong></p></br></br><b style="color: red;">This is an auto generate email, please do not reply and do not forword</b>`
        };

        const salt = await bcrypt.genSalt(10);
        const newpassword = await bcrypt.hash(newpass, salt);
        const isUpdate = await User.findByIdAndUpdate(user._id, { password: newpassword }, { new: true });

        if (isUpdate) {
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('Error sending email:', error);
                    return res.status(500).json({
                        message: 'Failed to send OTP. Please try again later.',
                        success: false
                    });
                } else {
                    return res.status(200).json({
                        message: 'New password sent to email successfully. Please check your inbox.',
                        success: true
                    });
                }
            });
        }
    }
    catch (err) {
        console.log("Can't handle forget password: " + err);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
})

const storage = multer.diskStorage({
    destination: "./public/images",
    filename: (req, file, cb) => {
        cb(null, "image_" + Date.now() + path.extname(file.originalname));
    }
})
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const extName = path.extname(file.originalname);
        if (extName.toLowerCase() === ".jpg" || extName.toLowerCase() === ".jpeg" || extName.toLowerCase() === ".png") {
            cb(null, true);
        }
        else {
            cb(new Error("Only .jpg or .jpeg format allowed!"));
        }
    }
})
router.put('/imageupload', fetchuser, upload.single('image'), async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                message: "User not found!",
                success: false
            })
        }
        const imageurl = req.file ? req.file.filename : null;
        if (!imageurl) {
            return res.status(400).json({
                message: "Only jpeg or jpg file allowed!",
                success: false
            });
        }
        await User.findByIdAndUpdate(user._id, { image: imageurl }, { new: true });
        return res.status(200).json({
            message: "Image Uploaded Successfully",
            success: true
        })

    } catch (error) {
        console.log("Can't upload image: " + error);
        return res.status(500).json({
            message: "505 Internal Server Error",
            success: false
        });
    }
})

module.exports = router;
