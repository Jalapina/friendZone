const mongoose = require('mongoose');
const user = require('./userSchema');

var messageSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    message:{
        type:String, 
        trim: true,
        minlength: 1,
        require: true,
    },

    chat:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
    }
},{
timestamp: true,
});

mongoose.model('Message',messageSchema);

