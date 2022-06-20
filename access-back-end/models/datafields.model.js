const mongoose = require ('mongoose')

const datafields = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'users'
    },
    type:{
        type:String, //'text' or 'file'
        required:true
    },
    field_id:{
        type:String,
        required:true
    },
    field_name:{
        type:String,
        required:true
    },
    field_value_address:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('datafields',datafields);