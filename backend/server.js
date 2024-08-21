const express = require('express');
const dbConnection = require('./db');

const app = express();
const PORT = 5000;

dbConnection();

app.use('/api/auth', require('./routes/login'));
app.use('/api/notes', require('./routes/notes'));

app.listen(PORT,()=>{
    try{
        console.log("Server Is Running on localhost:5000/api/");
    }
    catch(err)
    {
        console.log("unable to start server: " + err);
        return res.status(500).send(`500 Internal Server Error`);
    }
})