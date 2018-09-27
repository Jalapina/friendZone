const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const User = mongoose.model('User');

router.post('/friendships/create', function(request,response){
    
    usersArray = []

    let status = request.body.like
    let sender = request.body.userId
    let reciever = request.body.id
    
    friendReciever = {
        userId: sender,
        status: status,
    }

    friendRequest = {
        userId: reciever,
        status: status,
    }

    User.findById(sender,function(err,user){

        if(err){
            response.json({
                err:err
            });
        }else{
            array = user.friendlist
            array.forEach(element => {
                if(element.userId == reciever){
                    response.json({message:"Already friends"})
                }
            });

            user.friendlist.push(friendRequest);

            User.findById(reciever,function(err,user2){
                if(err){
                    response.json({error:err});
                }else{
                    friendList = user2.friendlist
                    friendList.forEach(element => {
                        if(element.userId == sender){
                            response.json({message:"Already friends"})
                        }
                    });
                    user2.friendlist.push(friendReciever);
                    user2.save();
                };
            });
            user.save(function(err){
                if(err){
                    response.json({error:err});
                }
            });
        }
    });

});

router.get('/friendships/:id', function(request,response){

    friends = []
    image = []
    
    User.findById(request.params.id).select('friendlist').exec(function(err,user){

        let friendList = user.friendlist

        friendList.forEach(element=>{
            if(element.status == true){
                friends.push(element.userId);
            }
        });

        User.find({'_id':{$in:friends}}).select("first_name image").exec(function(err,users){

            if(err){
                response.json({
                    error:err
                });
            }else{
                response.json({
                    users:users
                });
            }
        });
    });
});

router.put('/friendships/:id/:friend',function(request,response){

    const user = request.params.id
    const friendId = request.params.friend

    User.findById(user,function(err,user){
        user.friendlist.forEach(element =>{
            if(element.userId == friendId){
                console.log("Friend ",friendId," has been deleted.");
            }
        });
    });

});

module.exports = router;