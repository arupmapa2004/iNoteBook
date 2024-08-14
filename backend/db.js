const mongoose = require('mongoose');
const mongoURl = 'mongodb+srv://arupmapa:inotesbook@cluster0.3ynng.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
function dbConnection() {
    mongoose.connect(mongoURl)
        .then(() => {
            console.log('mongo connected');
        })
        .catch((err) => {
            console.log('Failed to connect DB: ' + err);
        });
}

module.exports = dbConnection;