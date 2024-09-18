require("dotenv").config();
const jwt = require('jsonwebtoken');
const fetchuser = (req,res,next)=>{
    const token = req.header('auth-token');
    if(!token)
    {
        return res.status(400).send({
            message: "Invalid Token",
            success: false
        });
    }
    try {
        const data = jwt.verify(token,process.env.SECRET);
        req.user = data.user;
        next();

    } catch (error) {
        return res.status(401).send({
            message: "Authentication Failed",
            success: false
        });
    }
}
module.exports = fetchuser;