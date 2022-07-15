const mongoose = require('mongoose');

const requestdetails = new mongoose.Schema({
    request_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'requests'
    },
    field_name:{
        type:String,
        required:true
    },
    datafield_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'datafields'
    },
    // verified:{
    //     type:Boolean,
    //     default:false,
    //     required:true
    // }
});

module.exports = mongoose.model('requestdetails',requestdetails);