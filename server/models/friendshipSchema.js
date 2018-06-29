const mongoose = require('mongoose');
const user = require('./userSchema');

const friendShipSchema = mongoose.Schema({
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
