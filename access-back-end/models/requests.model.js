const mongoose = require('mongoose');

const requests = new mongoose.Schema({
    data_owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'users' //change if you want to keep email.
    },
    data_accessor:{ 
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'users'
    },
    // time:{
    //     type:Boolean,
    //     default:false,
    //     required:true
    // }
    status:{
        type:String,
        required:true // 'req' means requested, 'den' means denied, 'acp' means accepted.
    }
},
{
 timestamps: { createdAt: 'created_at' }
}
);

module.exports = mongoose.model('requests',requests);