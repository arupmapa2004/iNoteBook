require("dotenv").config()
const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
            message: "Error fetching user",
            success: false
        });
    }
})
router.post('/signup', [
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('contactno').isLength({ min: 0, max: 10 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    console.log(req.body);
    let success = false;
    try {
        let u = await User.findOne({ email: req.body.email });
        if (!u) {
            const salt = await bcrypt.genSalt(10);
            const secretPassword = await bcrypt.hash(req.body.password, salt);
            const user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secretPassword,
                contactno: req.body.contactno,
                dob: req.body.dob,
                gender: req.body.gender,
                city: req.body.city,
                state: req.body.state
            });

            const userToken = {
                user: {
                    id: user.id,
                    name: user.name
                }
            };

            const authToken = jwt.sign(userToken, process.env.SECRET);
            //console.log(authToken);
            success = true;
            return res.status(200).send({
                message: "Registration successfully completed!",
                success: success,
                authToken: authToken
            });
        } else {
            return res.status(400).send({
                message: "Email already exists!",
                success: success
            });
        }
    } catch (error) {
        console.log("Error on signup: " + error);
        return res.status(500).send({
            message: "505 Internal Server Error",
            success: success
        });
    }
});


router.post('/signin', [
    body('email').isEmail(),
    body('password').exists(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    let success = false;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({
                message: "User Not Found!",
                success: success
            })
        }
        const passwordCheck = await bcrypt.compare(password, user.password);
        if (!passwordCheck) {
            return res.status(400).send({
                message: "Incorrect Password!",
                success: success
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
            success: success,
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
module.exports = router;
