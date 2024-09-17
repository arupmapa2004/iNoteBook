const express = require('express');
const cors = require('cors');
const dbConnection = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;
require("dotenv").config()
dbConnection();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/login'));
app.use('/api/notes', require('./routes/notes'));

app.listen(PORT,()=>{
    try{
        console.log("Server Is Running on https://inotebook-lmva.onrender.com");
    }
    catch(err)
    {
        console.log("unable to start server: " + err);
        return res.status(500).send({
           message: "500 Internal Server Error.",
           success:false
        });
    }
})