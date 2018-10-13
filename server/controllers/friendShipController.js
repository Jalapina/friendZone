const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const User = mongoose.model('User');
const Message = mongoose.model('Message')
const FriendShip = mongoose.model('FriendShip')

router.post('/friendships/create', function(request,response){
    
    let status = request.body.like
    let user = request.body.userId
    let reciever = request.body.id
    let activity = request.body.activity

    let newFriendShip = new FriendShip({
        status: status,
        activity: activity,
        user: user,
        users: [user,reciever],
    });

    newFriendShip.save(function(err,friendShip){
        if(err) console.log(err);
    });

});

router.get('/friendships/:id', function(request,response){

    friends = []
    image = []
    usersIds = []
    friendsWithMessages = []
    friendsWithOutMessages = []

    FriendShip.find({'users':request.params.id,"status":true}).populate("users","first_name image").exec(function(err,friends){
        
        friends.forEach(friend=>{
            friend.users.forEach(id=>{
                usersIds = id._id
            });        

            Message.findOne(({'users':{$all:usersIds}})).sort([['createdAt', 'descending']]).populate("users","first_name image").select("message createdAt users").exec(function(err,msg){
                if(err) console.log(err);
                else{
                    if(msg == null){

                        friend.users.forEach(function(user,index){
                            if(request.params.id == user._id){
                                friend.users.splice(index,1)
                            }
                        });

                        friendsWithOutMessages.push(friend);

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

    })
        
    setTimeout(function(){
        insertionSortForMessages(friendsWithMessages);
        insertionSortForMessages(friendsWithOutMessages)

        response.json({
            friendsWithMessages: friendsWithMessages,
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

router.delete('/friendships/:user/:friend/delete',function(request,response){

    const userParams = request.params.user
    const friendId = request.params.friend
    let users = [];
    
    users.push(userParams,friendId);

    FriendShip.findOne({'users':users},function(err,friendship){

        if(err) console.log(err);
        else{
            
            friendship.status = false

            friendship.save(function(err){
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

});

module.exports = router;