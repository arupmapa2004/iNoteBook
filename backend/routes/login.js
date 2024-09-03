const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = "@rupm@p@";

router.get('/', (req, res) => {
    // res.redirect('/signin');
});

router.post('/signup',[
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //console.log(req.body);
    let success = false;
    try {
        let u = await User.findOne({ email: req.body.email });
        if (!u) {
            const salt = await bcrypt.genSalt(10);
            const secretPassword = await bcrypt.hash(req.body.password, salt);
            const user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secretPassword
            });

            const userToken = {
                user: {
                    id: user.id
                }
            };

            const authToken = jwt.sign(userToken, JWT_SECRET);
            //console.log(authToken);
            success = true;
            return res.status(200).send({success,authToken});
        } else {
            return res.status(400).send("Email already exists!");
        }
    } catch (error) {
        console.log("Error on signup: " + error);
        return res.status(500).send("505 Internal Server Error");
    }
});


router.post('/signin',[
    body('email').isEmail(),
    body('password').exists(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //console.log(req.body);
    let success = false;
    const {email, password} = req.body;
    try {
        const user = await User.findOne({ email: email });
        if(!user)
        {
            success = false;
            return res.status(400).send("Please Enter Valid Email!")
        }
       const passwordCheck = await bcrypt.compare(password,user.password);
       if(!passwordCheck)
       {
         success = false;
         return res.status(400).send("Incorrect Password!");
       }
       const userToken = {
         user:{
            id : user.id
         }
       }
       const authToken = jwt.sign(userToken,JWT_SECRET);
       console.log(authToken);
       success = true;
       res.send({success,authToken});
    } catch (error) {
        console.log("Error on signin: " + error);
        return res.status(500).send("505 Internal Server Error");
    }
});

router.post('/getuser',fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        return res.status(200).send(`Hi... ${user.name} \n Your Email: ${user.email} \n Registration Date: ${user.date}`);
        
    } catch (error) {
        console.log("Can't Find User: " + error);
        return res.status(500).send("Internal Server Error");
    }
})
module.exports = router;
