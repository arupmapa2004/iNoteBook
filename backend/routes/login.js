const express = require('express');
const User = require('../models/User')
const router = express.Router();
const {body, validationResult} = require('express-validator');

router.get('/',(req,res)=>{
    res.send("hello world");
})
router.post('/',[
    body('name').isLength({min:3}),
    body('email').isEmail(),
    body('password').isLength({min:6}),
],(req,res)=>{
  const error = validationResult(req);
  if(!error.isEmpty())
  {
    return res.stutas(400).json({error: error.array()});
  }
  else{
    User.creatr({
        name: req.body.name,
        email: req.body.emial,
        password: req.body.password
    })
    .then(responce => responce.json())
    .then(()=>{console.log("user add succesfully")})
    .catch((err)=>{console.log("falied to push data during invalid input" + err)});
  }
})
module.exports = router;