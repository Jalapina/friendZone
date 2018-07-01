let mongoose = require('mongoose');
let User = mongoose.model('User');
let FriendShip = mongoose.model('FriendShip');

module.exports.create = function(request,response){

    let like = request.body.like
    let liker = request.body.userId
    let likee = request.body.id
    
    User.findById(liker,function(err,user){

        if(err){
            response.json({
                err:err
            });
        }else{
            console.log(user.friendList)
            array = user.friendList
            // array.forEach(element => {
            //     console.log(element)
            //     if(element == likee){
            //         console.log("Already friends")
            //         response.json({message:"Already friends"})
            //     }else{
            //         console.log("Not friends")
            //     }
            // });
            user.friendList.push(likee)
            // User.findById(likee,function(err,user2){
            //     if(err){
            //         response.json({error:err});
            //     }else{
            //         array = user2.friendList
            //         array.forEach(element => {
            //             console.log(element)
            //             if(element == likee){
            //                 console.log("Already friends")
            //                 response.json({message:"Already friends"})
            //             }
            //         });
            //         user2.friendList.push(liker);
            //         // user2.save();
            //     }
            // });
            // user.save(function(err){
            //     if(err){
            //         response.json({error:err});
            //     }else{
            //         response.json({message:"FriendRequest accepted"});
            //     }
            // });
        }
    });

}
