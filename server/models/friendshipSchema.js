const mongoose = require('mongoose');
const User = require('./userSchema');
const Schema = mongoose.Schema;

const friendShipSchema = mongoose.Schema({
    status:{
        type:Boolean,
    },
    activity:{
        type: String,
    }
    ,
    user:[ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true,  
    } ],
    users:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true,  
    }]
},{
    timestamps: true,    
});

mongoose.model('FriendShip',friendShipSchema);
