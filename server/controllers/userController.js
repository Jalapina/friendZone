let mongoose = require('mongoose');
let User = mongoose.model('User');

module.exports.login = function(request,response){
    console.log("Login Info",request.body);
    User.findOne({email:request.body.email},function(err,user){
        if(err){
            console.log("ERROR \n",err)
        }
        else if(user.validPassword(request.body.password)){
            response.json({
                id: user._id,
                first_name: first_name,
            })
        }
        else if(!user.validPassword(request.body.password)){
            console.log('Wrong password')
            response.status(403).json({
                message: "Password Invalid"
            })
        }
        else{
            response.status(403).json({
                message: "Email Invalid"
            })
        }
    })
}

module.exports.registration = function(request,response){
    console.log("Reg Info",request.body);
    
    let user = new User({
        first_name: request.body.first_name,
        email: request.body.email,
        password: request.body.password,
    })
    if( user.password == request.body.confirm_password){
        user.save(function(err,newUser){
            if(err){
                console.log("Error savig user \n",err)
            }
            else{
                response.json({
                    user:newUser
                });
            }
        });    
    }
    else{
        console.log("Else on registration");
        response.status(403).json({
            message:"Passwords do not match!"
        });
    }

}
