let mongoose = require('mongoose');
let User = mongoose.model('User');
var jwt = require('jsonwebtoken');
var secret = 'asdfasdf'

module.exports.authenticate = function(request,response){

    const email = request.body.email
    
    User.findOne({email:email}).select('first_name _id password').exec(function(err,user){
        
        if(err){
            console.log(err)
        }else if(!user){
            response.status(404).json({
                message:"User does not exist"
            })
        }else{
            if(!request.body.password){
                response.json({
                    message:"No password provided."
                })
            }else{
                // let validPassword = user.validPassword(request.body.password)
                // if(!validPassword){
                //     response.json({
                //         success:false,
                //         message:"Could not authenticate password"
                //     })
                // }else{
                    const token = jwt.sign({ id: user._id, first_name: user.first_name,}, secret,{ expiresIn: '24h' });
                    response.json({
                        message:"User is Authenicated!",
                        token: token,
                    })
                // }
            }
        }

        // else if(user && user.validPassword(request.body.password)){

        //     const token = jwt.sign({ id: user._id, first_name: user.first_name,}, secret,{ expiresIn: '24h' });            

        //     response.json({
        //         message:"User is Authenicated!",
        //         token: token,
        //     })
        // }

        // else if(user && !user.validPassword(request.body.password)){
        //     console.log('Wrong password')
        //     response.status(403).json({
        //         message: "Invalid Email or Password"
        //     })
        // }

        // else{
        //     response.status(403).json({
        //         message: "User does not exist"
        //     })
        // }

    })
}

module.exports.create = function(request,response){
    
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
                
                const token = jwt.sign(
                    { 
                        id: newUser._id, 
                        first_name: newUser.first_name,
                    },
                    secret,
                    { 
                        expiresIn: '24h' 
                    }); 

                response.json({
                    
                        message: "User is Authenicated!",
                        token: token,
                    
                });
            }
        });    
    }

    else{
        response.status(401).json({
            message:"Passwords do not match!"
        });
    }

}

module.exports.users = function(request,response){
    
    let userArray = []

    User.findById(request.params.id).select("friendList").exec(function(err,user){

        if(err){
            response.json({error:err})
        }else{
            friendList = user.friendList
            friendList.pop()
            friendList.push(request.params.id)
            console.log(friendList)

            User.find({'_id':{ $nin:friendList},'active':true}).select('first_name').exec(function(err,users){

                console.log(users)
                if(err){
                    console.log(err)
                }else{
                    response.json({
                        users:users
                    })
                }
            })
        }
    });

    
    
}

module.exports.authToken = function(req, res, next){
    
    var token = req.headers['authorization']

    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, secret, function(err, decoded) {
        console.log("decoded",decoded)
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      
      User.findById(decoded.id, { password: 0 },function (err, user) {
          console.log(user)
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
        // next(user); // add this line
      });
    });

}

module.exports.tokenDecode = function(user, req, res,next) {
    
    // res.send(user); 
};

module.exports.user = function(request,response){
    // console.log(request.params)

    User.findById(request.params.id, function(err,user){
        if(err) return response.json({err:err,message:"NO USER"})

        console.log(user)
        response.json({
            message:"Here is the user",
            user:user
        })
    })
}

module.exports.edit = function(request,response){
    console.log("Updating user",request.body)

    User.findById(request.body._id,function(err,user){
        if(err){
            console.log(err)
            response.status(404).json({
                error:err
            })
        }else{
            user.blur = request.body.blur
            user.bio = request.body.bio
            user.activity = request.body.activity
            user.hobbies = request.body.hobbies
            console.log(user)
            user.save(function(err,editedUser){
                if(err){
                    console.log(err);
                    response.status(404).json({
                        error:err,
                        message:"Error"
                    })
                }
            })
        }
    })

}

module.exports.userActivation = function(request,response){
    console.log(request.body)
    User.findById(request.body.user).exec(function(err,user){
        user.active = request.body.active
        user.save(function(err){
            if(err) response.json({error:err})
        })
    })
}
