const { toBeRequired } = require('@testing-library/jest-dom/matchers');
const mongoose = require('mongoose');
const {Schema} = mongoose;

const noteSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
    },
    date:{
        type: Date,
        default: Date.now
    },
    tag:{
        type: String,
        default: "Default"
    }
  });

  module.exports = mongoose.model('notes', noteSchema)