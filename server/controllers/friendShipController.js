let mongoose = require('mongoose');
let User = mongoose.model('User');
let Message = mongoose.model('Message')
let FriendShip = mongoose.model('FriendShip');

module.exports.create = function(request,response){
    
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
            array = user.friendList
            array.forEach(element => {
                if(element.userId == reciever){
                    response.json({message:"Already friends"})
                }
            });
            user.friendList.push(friendRequest)

            User.findById(reciever,function(err,user2){
                if(err){
                    response.json({error:err});
                }else{
                    friendList = user2.friendList
                    friendList.forEach(element => {
                        if(element.userId == sender){
                            response.json({message:"Already friends"})
                        }
                    });
                    user2.friendList.push(friendReciever);
                    user2.save();
                }
            });
            user.save(function(err){
                if(err){
                    response.json({error:err});
                }
            });
        }
    });

}

module.exports.friends = function(request,response){
    friends = []
    User.findById(request.params.id).select('friendList').exec(function(err,user){

        let friendList = user.friendList

        friendList.forEach(element=>{
            if(element.status == true){
                friends.push(element.userId)
            }
        })
        console.log(friends)
        User.find({'_id':{$in:friends}}).select("first_name").exec(function(err,users){
            console.log(users)
            if(err){
                response.json({
                    error:err
                })
            }else{
                response.json({
                    users:users
                })
            }
        })
    })
}