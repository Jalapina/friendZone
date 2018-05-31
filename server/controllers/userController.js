let mongoose = require('mongoose');
let User = mongoose.model('User');

module.exports.authenticate = function(request,response){

    const _email = request.body.email;

    if(validateEmail(_email)){
        console.log("Email works")
    }
    else{
        console.log("User does not exist")
        
        return response.status(404).json({
            message:"User does not exist"
        })
    }
    
    User.findOne({email:_email}, function(err,user){
        
        if(err){
            console.log(err)
        }

        else if(user && user.validPassword(request.body.password)){
            response.json({
                id: user._id,
                first_name: user.first_name,
            })
        }

        else if(user && !user.validPassword(request.body.password)){
            console.log('Wrong password')
            response.status(403).json({
                message: "Invalid Email or Password"
            })
        }

        else{
            response.status(403).json({
                message: "User does not exist"
            })
        }

    })
}

module.exports.create = function(request,response){

    console.log("Reg Info",request.body);
    
    const first_name = request.body.first_name
    const email = request.body.email
    const password = request.body.password
    const confirm_password = request.body.confirm_password
    

    if(!first_name){
        return response.status(401).json({
            message:"No First Name"
        })
    }
    if(!email){
        return response.status(401).json({
            message: "No Email"
        })
    }
    if(!password || !confirm_password){
        return response.status(401).json({
            message: "Passwords do not match!"
        })
    }

    let user = new User({
        first_name: request.body.first_name,
        email: request.body.email,
        password: request.body.password,
    });

    if( user.password == request.body.confirm_password){

        user.save(function(err,newUser){

            if(err){
                console.log("Error savig user \n",err)
            }

            else{
                response.json({
                    user:{
                        first_name: newUser.first_name,
                        id: newUser._id,
                    }
                });
            }
        });    
    }

    else{
        console.log("Else on registration");
        response.status(401).json({
            message:"Passwords do not match!"
        });
    }

}
