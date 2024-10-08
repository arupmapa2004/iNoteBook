const mongoose = require('mongoose');
const mongoURl = process.env.MONGO;

function dbConnection() {
    mongoose.connect(mongoURl)
        .then(() => {
            console.log('DataBase Is Connected Successfully');
        })
        .catch((err) => {
            console.log('Failed to connect DB: ' + err);
        });
}

module.exports = dbConnection;