const express = require('express');
const User = require('../models/User')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRECT = "@rupm@p@";

router.get('/', (req, res) => {
    res.send("hello world");
})
router.post('/signup', [
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
], async (req, res) => {
    const error = validationResult(req);
    console.log(req.body);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }
    else {
        try {
            let u = await User.findOne(req.body.email);
            if (!u) {
                const salt = await bcrypt.genSalt(10);
                const secrectPassword = await bcrypt.hash(req.body.password, salt);
                const user = await User.creatr({
                    name: req.body.name,
                    email: req.body.emial,
                    password: secrectPassword
                })
                user.save();
                const userToken = {
                    user: {
                        id: user.id
                    }
                }
                const authToken = jwt.sign(userToken, JWT_SECRECT);
                console.log(authToken);
                return res.status(200).send("user add successfully");
            }
            else {
                return res.status(400).send("Email already Exits!");
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send("500 Internal Server Error")
        }
    }
})
module.exports = router;