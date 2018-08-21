const mongoose = require('mongoose');
const User = require('./userSchema');
const Schema = mongoose.Schema;

const friendShipSchema = mongoose.Schema({
    // status:{
    //     type:Boolean
    // },
    // friend:[ {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    // } ],
    // follower:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     status:{
    //         type: Boolean,
    //         default: false,
    //     }
    // },
    // followee:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     status:{
    //         type: Boolean,
    //         default: false,
    //     },
    // },
},{
    timestamps: true,    
});

mongoose.model('FriendShip',friendShipSchema);
