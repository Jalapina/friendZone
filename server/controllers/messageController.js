const mongoose = require('mongoose');
const Message = mongoose.model('Message');
const User = mongoose.model('User');
const express = require('express');
const router = express.Router();

router.post('/messages/create', function(request,response){

    let users = [];

    users.push(request.decoded.id,request.body.reciever);

    let sender = mongoose.Types.ObjectId(request.decoded.id);
    let reciever = mongoose.Types.ObjectId(request.body.reciever);
    
    let message = new Message({
        sender:sender,
        users:[sender,reciever],
        message:request.body.message,
    });

    message.save(function(err,result){
        if(err){
            console.log(err)
            response.json({
                error:err
            })
        }else{
            response.json({
                message:"message sent."
            })
        }
    })
});

router.get('/messages/:reciever', function(request,response){

    let users = []
    let user = request.decoded.id;
    let friend =  request.params.reciever
    users.push(friend,user)

    Message.find({'users':{$all:users}}).populate("users sender","first_name").exec(function(err,chat){
        console.log(chat)
        if(err){
            response.json({
                error:err
        });
        }else if(chat.length == 0){
            User.findById(friend).select('first_name').exec(function(err,user){
                
                if(err) return response.json({err:err,message:"NO USER"})
                response.json({
                    user:user
                });

            });
        }else{
            response.json({
                chat:chat,
                user:user
            });
        }
    });
});

module.exports = router;

