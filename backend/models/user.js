const { toBeRequired } = require('@testing-library/jest-dom/matchers');
const { mongoose } = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    DOB:{
        type: Date,
        default: Date.now
    }
  });

const User = mongoose.model('user', userSchema)
module.exports = User