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

    message.save(function(messageErr,result){
        User.findById(reciever).select("notification").exec(function(userErr,user){
            if(userErr){
                console.log(userErr)
            }else{
                user.notification = true
                user.save(function(userSaveErr){
                    if(userSaveErr) console.log(userSaveErr);
                    if(messageErr){
                        console.log(messageErr)
                        response.json({
                            error:messageErr
                        })
                    }else{
                        response.json({
                            message:"message sent."
                        })
                    }
                })
            }
        })
        
    })
});

router.get('/messages/:reciever', function(request,response){

    let users = []
    let user = request.decoded.id;
    let friend =  request.params.reciever
    users.push(friend,user)

    Message.find({'users':{$all:users}}).populate("users sender","first_name").exec(function(err,chat){

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

router.put('/messages/read',function(request,response){
    
    Message.findById(request.body._id,function(err,message){

        if(err) console.log(err)
        else{
            message.read = true
            
            message.save(function(err){
                if(err) console.log(err);
            });
        }

    });

});

module.exports = router;

