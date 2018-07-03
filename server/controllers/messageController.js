const mongoose = require('mongoose');
let Message = mongoose.model('Message')

module.exports.create = function(request,response){
    console.log(request.body);
    let users = [];
    users.push(request.body.sender,request.body.reciever);
    let sender = mongoose.Types.ObjectId(request.body.sender);
    let reciever = mongoose.Types.ObjectId(request.body.reciever);
    console.log(sender)

    let message = new Message({
        sender:sender,
        users:[sender,reciever],
        message:{
            text:request.body.message
        },
    });

    message.save(function(err,result){
        if(err){
            console.log(err)
            response.json({
                error:err
            })
        }else{
            console.log(result)
            response.json({
                message:"message sent."
            })
        }
    })


}

module.exports.getMessages = function(request,response){

    let users = []
    users.push(request.params.sender,request.params.reciever)

    console.log(users)

    Message.find({users:{$in:users}}).exec(function(err,chat){
        if(err){
            response.json({
                error:err
            })
        }else{
            console.log("Chat",chat)
            response.json({
                chat:chat
            })
        }
    })
}
