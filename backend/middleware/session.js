require('dotenv').config();
const session = require('express-session');

const sessionData = session({
    saveUninitialized: true,
    secret: process.env.SESSIONSECRET,
    resave: false
})

const checkSession = (req,res,next)=>{
    try {
        if(req.session.user)
        {
            next();
        }
        else
        {
           return res.redirect("/signin");
        }
        
    } catch (error) {
        console.log(error)
       return res.status(500).json({
         message: "Can't authenticate at this time",
         success: false
       })
    }
}

module.exports = checkSession;
module.exports = sessionData;