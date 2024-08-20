const jwt = require('jsonwebtoken');
const JWT_SECRET =  "@rupm@p@";

const fetchuser = (req,res,next)=>{
    const token = req.header('auth-token');
    if(!token)
    {
        return res.status(400).send("Invalid Token");
    }
    try {
        const data = jwt.verify(token,JWT_SECRET);
        req.user = data.user;
        next();

    } catch (error) {
        return res.status(401).send("Authentication Failed");
    }
}
module.exports = fetchuser;