const mongoose = require('mongoose');
const user = require('./userSchema');
const Schema = mongoose.Schema;

var messageSchema = mongoose.Schema({
    participants:[{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    message:[{
        type:String, 
        trim: true,
    }],
},{
timestamp: true,
});

mongoose.model('Message',messageSchema);

