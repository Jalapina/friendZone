const mongoose = require('mongoose');
const Message = mongoose.model('Message');
const express = require('express');
const router = express.Router();

router.post('/messages/create', function(request,response){

    let users = [];
    users.push(request.body.sender,request.body.reciever);
    let sender = mongoose.Types.ObjectId(request.body.sender);
    let reciever = mongoose.Types.ObjectId(request.body.reciever);
    
    let message = new Message({
        sender:sender,
        users:[sender,reciever],
        message:{
            text:request.body.message
        },
    });

    message.save(function(err,result){
        if(err){
            console.log(err)
            response.json({
                error:err
            })
        }else{
            console.log(result)
            response.json({
                message:"message sent."
            })
        }
    })
});

router.get('/messages/:sender/:reciever', function(request,response){

    let users = []
    
    users.push(request.params.reciever,request.params.sender);

    Message.find({'users':{$all:users}}).populate("users sender","first_name").exec(function(err,chat){
        
        if(err){
            response.json({
                error:err
            });
        }else{
            response.json({
                chat:chat
            });
        }
    });
});

module.exports = router;

