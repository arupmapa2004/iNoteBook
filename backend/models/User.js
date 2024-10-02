const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const UserSchema = new Schema({
    image:{
        type: String,
        default:"https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1726617600&semt=ais_hybrid"
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    contactno:{
      type: String,
      required: true
    },
    dob:{
        type: Date,
        required: true
    },
    gender:{
       type: String,
       required: true
    },
    city:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
})
const User = mongoose.model('user',UserSchema);
module.exports = User;