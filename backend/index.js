require('dotenv').config();
 
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const dbConnection = require('./db');
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
dbConnection();

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/api/auth', require('./routes/login'));
app.use('/api/notes', require('./routes/notes'));

app.listen(PORT, async() => {
    try {
        console.log("Server Is Running on https://inotebook-lmva.onrender.com");
    }
    catch (err) {
        console.log("unable to start server: " + err);
        return res.status(500).send({
            message: "500 Internal Server Error.",
            success: false
        });
    }
})


