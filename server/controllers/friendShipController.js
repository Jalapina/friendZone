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
    let createdAt = Date.now()
    
    friendReciever = {
        userId: sender,
        status: status,
        createdAt: createdAt,
    }

    friendRequest = {
        userId: reciever,
        status: status,
        createdAt: createdAt,        
    }

    User.findById(sender,function(err,user){

        if(err){
            response.json({
                err:err
            });
        }else{
            friends = user.friendlist
            console.log(friends)
            friends.forEach(friend => {
                if(friend.userId == reciever){
                    return response.json(
                        {message:"Already friends"}
                    );
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
    friendsWithMessages = []
    friendsWithOutMessages = []

    
    User.findById(request.params.id).select('friendlist').populate('friendlist.userId','first_name image').exec(function(err,user){

        let friendList = user.friendlist
        
        friendList.forEach(friend=>{
            if(friend.status == true){
                friends.push(friend);
            }
        });

        friends.forEach(friend=>{
            Message.findOne(({'users':{$all:[request.params.id,friend.userId._id]}})).sort([['createdAt', 'descending']]).populate("users","first_name image").select("message createdAt users").exec(function(err,msg){
                if(err) console.log(err);
                else{
                    if(msg == null){
                        friendsWithOutMessages.push(friend)
                    }else{

                        let users =  msg.users
                        users.forEach(function(userInMessageArray,index){
                            if(request.params.id == userInMessageArray._id){
                                msg.users.splice(index,1)
                            }
                        });

                        friendsWithMessages.push(msg);

                    }
                }
            });
        });

        setTimeout(function(){
            // console.log(friendsWithOutMessages)
            insertionSortForMessages(friendsWithMessages)
            insertionSortForMessages(friendsWithOutMessages)

            response.json({
                friendsWithMessages:friendsWithMessages,
                friendsWithOutMessages: friendsWithOutMessages,
            });

        },300);

        function insertionSortForMessages(array){

            length = array.length
            
            for(var x = 0; x < length; x++){

                let temp = array[x];

                for (var j = x - 1; j >= 0 && array[j].createdAt.getTime() < temp.createdAt.getTime(); j--) {
                    array[j + 1] = array[j];
                }

                array[j + 1] = temp

            }

        }

    });
});

router.delete('/friendships/:user/:friend/delete',function(request,response){

    const userParams = request.params.user
    const friendId = request.params.friend
    let users = [];
    
    users.push(userParams,friendId);

    User.findById(userParams,function(err,user){

        const friendList = user.friendlist
        
        friendList.forEach(function(element,index){

            if(element.userId == friendId){
                
                user.friendlist.splice(index,1)

                user.save(function(err){
                    if(err) console.log(err)
                });
            }

        });
        User.findById(friendId,function(err,user2){

            const friendList2 = user2.friendlist

            if(err){
                console.log(err);
            }

            friendList2.forEach(function(friends,idx){

                if(friends.userId == userParams){

                    user2.friendlist.splice(idx,1);

                    user2.save(function(err){
                        if(err) console.log(err);
                        else{
                            user2.save(function(err){
                                if(err) console.log(err);
                                else{
                                    Message.remove({'users':{$all:users}}).exec(function(err){
                                        if(err) console.log(err)
                                        else{
                                            response.json({
                                                success:true
                                            });
                                        }
                                    });                                      
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