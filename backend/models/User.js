const { type } = require('@testing-library/user-event/dist/type');
const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const UserSchema = new Schema({
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