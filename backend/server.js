const express = require('express');
const dbConnection = require('./db');

const app = express();
const PORT = 5000;

dbConnection();

app.use('/api', require('./routes/login'));

app.listen(PORT,()=>{
    try{
        console.log("Server Started on port 5000..");
    }
    catch(err)
    {
        console.log("unable to start server: " + err);
        return res.status(500).send(`500 Internal Server Error`);
    }
})