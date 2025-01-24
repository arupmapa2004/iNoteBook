require("dotenv").config()
const express = require('express');
const User = require('../models/User');
const Note = require('../models/Notes');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const nodemailer = require('nodemailer');

// Configuring nodemailer with your SMTP settings
const transporter = nodemailer.createTransport({
    service: 'gmail', // false for TLS - as a boolean not string
    host: 'smtp@gmail.com',
    port: 587,
    auth: {
        user: 'inotebookinfo@gmail.com',
        pass: 'minl xrwx jzvp zoid'
    }
});

router.get('/get-all-users', fetchuser, async (req, res) => {
    const userId = req.user.id;
    const user = await User.findById(userId);
    try {
        if (!user) {
            return res.status(404).json({
                message: "Admin User Not Found",
                success: false,
            })
        }
        if (user.role != "admin") {
            return res.status(405).json({
                message: "Only admin can access",
                success: false
            })
        }
        const users = await User.find({ _id: { $ne: userId } });
        return res.status(200).json({
            message: "Users fetch successfully",
            success: true,
            users: users
        })
    } catch (error) {
        console.error("Error on fetching all users: " + error);
        return res.status(505).json({
            message: "505 Internal server Error",
            success: false
        })
    }
})
router.get('/get-user-notes/:id', fetchuser, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "Admin user not found",
                success: false
            })
        }
        if (user.role !== 'admin') {
            return res.status(405).json({
                message: "Only admin can access",
                success: false
            })
        }
        const notes = await Note.find({ user: req.params.id });
        return res.status(200).json({
            message: "User notes fetch successfully",
            success: true,
            notes: notes
        })
    } catch (error) {
        console.log("Error on fetching user notes: " + error);
        return res.status(505).json({
            message: "505 Internal server error",
            success: false
        })
    }
})
router.put('/make-admin-or-not/:id', fetchuser, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "Admin user not found",
                success: false
            })
        }
        if (user.role !== 'admin') {
            return res.status(405).json({
                message: "Only admin can do this",
                success: false
            })
        }

        const targetUser = await User.findById(req.params.id);

        if (!targetUser) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        // Toggle role
        const newRole = targetUser.role === 'user' ? 'admin' : 'user';
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { role: newRole },
            { new: true, runValidators: true } // This returns the updated document
        );

        return res.status(200).json({
            message: "User role changed successfully",
            success: true,
            role: updatedUser.role // Return the updated role
        });
    } catch (error) {
        console.log("Error on fetching user notes: " + error);
        return res.status(505).json({
            message: "505 Internal server error",
            success: false
        })
    }
})
router.delete('/delete-user/:id', fetchuser, async (req, res) => {

    try {
        const userId = req.user.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "Admin User Not Found",
                success: false
            })
        }

        if (user.role !== "admin") {
            return res.status(405).json({
                message: "Only admin can do this",
                success: false
            })
        }

        const user2 = User.findById(req.params.id);
        if (!user2) {
            return res.status(404).json({
                message: "No User Founded",
                success: false
            })
        }

        await Note.deleteMany({ user: req.params.id });
        await User.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            message: "User deleted Successfully",
            success: true
        })

    } catch (error) {
        console.error("Error on deleting user and notes: " + error);
        return res.status(500).json({
            message: "500 Internal server error",
            success: false
        })
    }
})
router.post('/contact-us', [
    body('name', 'Name should be at least 3 characters').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('contactno', 'Contact number must be 10 digits').isLength({ min: 10, max: 10 }).isNumeric(),
    body('description', 'Description must be at least 10 characters').isLength({ min: 10 }),
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
        
        const admins = await User.find({role: 'admin'});
        if(!admins)
        {
            return res.status(408).json({
                message:"No admin founded",
                success: false
            })
        }
        const adminEmails = admins.map(admins => admins.email).join(',');
        const mailOptions = {
            from: '"iNoteBook" <inotebookinfo@gmail.com>',
            to: adminEmails,
            subject: 'Need Your Help',
            html: `<p>Dear Admin,</p>
            </br>
            <p>Greetings from iNoteBook!</p>
            <p>We have received a contact request from <strong>${req.body.name}</strong>. Please solve his/her problem as soon as possible.</p>
            <p>Email Adress: ${req.body.email}</p>
            <p>Contact Number: ${req.body.contactno}</p>
            <p>Description: ${req.body.description}</p>
            <b style="color: red;">This is an auto-generated email, please do not reply!</b>
            <p>Regards</p>
            <p>Team iNoteBook</p>
            `
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email:', error);
                return res.status(500).json({
                    message: 'Failed to send Your Request. Please try again later.',
                    success: false
                });
            } else {
                return res.status(200).json({
                    message: 'Your Request Submitted! We will contact you soon.',
                    success: true
                });
            }
        });
    } catch (error) {
        console.error("Error on contact with us: " + error);
        return res.status(504).json({
            message: "504 Internal server error",
            success: false
        })
    }
})
module.exports = router;