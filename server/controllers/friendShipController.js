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
    friends = []
    User.findById(request.params.id).select('friendList').exec(function(err,user){

        let friendList = user.friendList
        // console.log(friendList)
        User.find({'_id':{$in:friendList}}).select('first_name').exec(function(err,users){
            
            friendList.forEach(function(x){
                Message.find({'users':{$all:[request.params.id,x]}}).populate("users","first_name").select("updatedAt users message").limit(1).sort([['createdAt', 'descending']]).exec(function(err,msg){
                    msg[0].users.splice(0,1)
                    // console.log(msg)
                    friends.push(msg)
                    
                })
            })
            // console.log()
            
            setTimeout(function(){
                // console.log(friends)
                if(err){
                    response.json({
                        error:err
                    })
                }else{
                    response.json({
                        users:friends
                    })
                }
            },1000)
            
        })
    })
}