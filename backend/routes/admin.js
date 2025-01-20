require("dotenv").config()
const express = require('express');
const User = require('../models/User');
const Note = require('../models/Notes');
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

        await Note.deleteMany({ user: userid });
        await User.findByIdAndDelete(userid);

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
module.exports = router;