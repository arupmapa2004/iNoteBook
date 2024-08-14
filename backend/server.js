const express = require('express');
const dbConnection = require('./db');

const app = express();
const PORT = 3000;

dbConnection();

app.use('/api', require('./routes/login'));

app.listen(PORT,()=>{
    console.log("Server Started");
})