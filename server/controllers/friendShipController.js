let mongoose = require('mongoose');
let User = mongoose.model('User');
let Message = mongoose.model('Message')
let FriendShip = mongoose.model('FriendShip');

module.exports.create = function(request,response){
    usersArray = []
    let like = request.body.like
    let liker = request.body.userId
    let likee = request.body.id
    usersArray.push(liker,likee)
    User.findById(liker,function(err,user){

        if(err){
            response.json({
                err:err
            });
        }else{
            array = user.friendList
            array.forEach(element => {
                if(element == likee){
                    response.json({message:"Already friends"})
                }
            });
            user.friendList.push(likee)
            User.findById(likee,function(err,user2){
                if(err){
                    response.json({error:err});
                }else{
                    friendList = user2.friendList
                    friendList.forEach(element => {
                        if(element == likee){
                            response.json({message:"Already friends"})
                        }
                    });
                    user2.friendList.push(liker);
                    user2.save();
                }
            });
            user.save(function(err){
                if(err){
                    response.json({error:err});
                }else{
                    let message = new Message({
                        participants: usersArray,
                    })
                    message.save(function(err){
                        if(err) console.log(err);
                    })
                    response.json({message:"FriendRequest accepted"});
                }
            });
        }
    });

}

module.exports.friends = function(request,response){
    User.findById(request.params.id).select('friendList').exec(function(err,user){

       let friendList = user.friendList
        console.log(friendList)
        User.find({'_id':{$in:friendList}}).select('first_name').exec(function(err,users){
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