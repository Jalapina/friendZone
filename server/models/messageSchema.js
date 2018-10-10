const mongoose = require('mongoose');
const User = require('./userSchema');
const Schema = mongoose.Schema;

const messageSchema = mongoose.Schema({
    message:{
        type:String, 
        required:true,
    },
    users:[{
        type:mongoose.Schema.Types.ObjectId, ref:'User', required:true
    }],
    sender: { type:mongoose.Schema.Types.ObjectId, ref:'User' },
    // reciever: { type:mongoose.Schema.Types.ObjectId, ref:'User' },
    read: { type:Date }
},
{
    timestamps: true
});

mongoose.model('Message',messageSchema);

