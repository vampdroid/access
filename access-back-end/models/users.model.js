const mongoose = require('mongoose');

const users = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    verified:{
        type:Boolean,
        default:false,
        required:true
    }
});

module.exports = mongoose.model('users',users);