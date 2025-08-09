require("dotenv").config();
const cloudinary = require('cloudinary').v2;
const https = require('https');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    secure: true,
    agent: new https.Agent({ rejectUnauthorized: false }) // Only needed for self-signed SSL errors
})

module.exports = cloudinary;