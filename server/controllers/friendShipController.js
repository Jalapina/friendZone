const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const User = mongoose.model('User');
const Message = mongoose.model('Message')

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
            friends = user.friendlist
            friends.forEach(friend => {
                if(friend.userId == reciever){
                    response.json(
                        {message:"Already friends"}
                    )
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

router.delete('/friendships/:user/:friend/delete',function(request,response){

    const userParams = request.params.user
    const friendId = request.params.friend

    User.findById(userParams,function(err,user){

        const friendList = user.friendlist
        
        friendList.forEach(function(element,index){

            if(element.userId == friendId){
                
                user.friendlist.splice(index,1)
                console.log("friendlist delete",user.friendlist)
                user.save(function(err){
                    if(err) console.log(err)
                })
            }

        });
        User.findById(friendId,function(err,user2){
            console.log(user2)
            const friendList2 = user2.friendlist

            if(err){
                console.log(err);
            }

            friendList2.forEach(function(friends,idx){

                if(friends.userId == userParams){

                    user2.friendlist.splice(idx,1)
                    console.log("friendList delete 2",user2.friendlist)
            
                    user2.save(function(err){
                        if(err) console.log(err);
                        else{
                            user2.save(function(err){
                                if(err) console.log(err)
                                else{
                                    response.json({
                                        success:true
                                    })
                                }
                            });
                        }
                    });

                }
            });

        });           
    });

});

module.exports = router;