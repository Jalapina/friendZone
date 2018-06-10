const mongoose = require('mongoose');
const user = require('./userSchema');

const chatSchema = mongoose.Schema({
    participants:[{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
});

mongoose.model('Chat',chatSchema);