const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const User = mongoose.model('User');
const Message = mongoose.model('Message')
const FriendShip = mongoose.model('FriendShip')

router.post('/friendships/create', function(request,response){
    
    let status = request.body.status
    let user = request.decoded.id
    let reciever = request.body.id
    let activity = request.body.activity
    let users = [user,reciever]

    let newFriendShip = new FriendShip({
        status: status,
        activity: activity,
        user: user,
        users: [user,reciever],
    });
    //check if they are already friends
    FriendShip.findOne({"users":users},function(err,friendship){

        if(err) console.log(err);
        else if(friendship == null){
            //Query other user being friendzoned and turn on a notification.
            User.findById(reciever).select("notification").exec(function(err,user){
                if(err) console.log(err);
                else{
                    user.notification = true
                    user.save(function(){
                        newFriendShip.save(function(err){
                            if(err) console.log(err);
                        });
                    });
                }
            });
        }
    });

});

router.get('/friendships', function(request,response){

    image = []
    friendsWithMessages = []
    friendsWithOutMessages = []
    //Turn off any notification the user had.
    User.findById(request.decoded.id).select("notification").exec(function(err,user){
        if(err) console.log(err);
        else{
            user.notification = false
            user.save()
        }
    });
    //find all friendships where they're both friends
    FriendShip.find({'users':request.decoded.id,"status":true}).populate("users","first_name image").exec(function(err,friends){

        friends.forEach(friend=>{
            usersIds = []
            friend.users.forEach(user=>{
                usersIds.push(user._id)
            });
            //Check if they have messages and take the last message for a chat preview
            Message.findOne(({'users':{$all:usersIds}})).lean().sort([['createdAt', 'descending']]).populate("users","first_name image").select("message createdAt users sender read").exec(function(err,msg){
                if(err) console.log(err);
                else{
                    if(msg == null){
                        //if no messages than push the users data in the friendsWithOutMessages array
                        friend.users.forEach(function(user,index){
                            if(request.decoded.id == user._id){
                                friend.users.splice(index,1)
                            }
                        });
                        friendsWithOutMessages.push(friend);
                    }else{
                        //else add the user along with the message to the friendsWithMessages array.
                        let users =  msg.users
                        msg.activity = friend.activity
                        
                        users.forEach(function(userInMessageArray,index){
                            if(request.decoded.id == userInMessageArray._id){
                                msg.users.splice(index,1)
                                
                            }if(request.decoded.id == msg.sender){
                                msg.read = true
                            }
                        });
                        friendsWithMessages.push(msg);
                    }
                }
            });

        });
    });
        
    setTimeout(function(){
        //sort messages from most recent
        insertionSortForMessagesAndFriends(friendsWithMessages);
        //sort friends from most recent
        insertionSortForMessagesAndFriends(friendsWithOutMessages)

        response.json({
            friendsWithMessages: friendsWithMessages,
            friendsWithOutMessages: friendsWithOutMessages,
        });

    },200);

    function insertionSortForMessagesAndFriends(array){

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

router.delete('/friendships/:friend/delete',function(request,response){

    const user = request.decoded.id
    const friendId = request.params.friend
    const users = [user,friendId]

    FriendShip.findOne({'users':{$all:users}},function(err,friendship){

        if(err) console.log(err);
        else if(friendship == null){
            console.log("no friendship")
        }
        else{
            friendship.status = false
            friendship.save(function(err){
            if(err) console.log(err);
            else{
                Message.deleteMany({'users':{$all:users}}).exec(function(err){
                if(err) console.log(err)
                else{
                    User.findById(friendId).select("notification").exec(function(err,user){
                        if(err) console.log(err);
                        else{
                            user.notification = false
                            user.save(function(){
                                response.json({
                                    success:true
                                });
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

module.exports = router;