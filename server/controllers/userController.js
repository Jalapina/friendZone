let mongoose = require('mongoose');
let User = mongoose.model('User');
let FriendShip = mongoose.model('FriendShip');
var jwt = require('jsonwebtoken');
let bcrypt = require('bcrypt');
const saltRounds = 10;
var secret = 'asdfasdf';
let check = require('validator').check

module.exports.authenticate = function(request,response){

    const email = request.body.email
    const password = request.body.password

    if(!password){
        response.json({
            message:"No password provided."
        })
    } 
    
    User.findOne({email:email}).select('first_name password').exec(function(err,user){
        
        if(err){
            console.log(err)
        }else if(!user){
            response.status(404).json({
                message:"Invalid Email or Password"
            });
        }else{ 
            
            const hash = user.password

            bcrypt.compare(password, hash, function(err, res) {
                if(err) console.log(err);
                console.log(res)
                if(res === false){
                    response.status(404).json({
                        message:"Invalid Email or Password"
                    });
                }else{
                    const token = jwt.sign({ id: user._id, first_name: user.first_name,}, secret,{ expiresIn: '24h' });
                    response.json({
                        message:"User is Authenicated!",
                        token: token,
                    });
                }
            });
            
        }

    })
}

module.exports.create = function(request,response){

    const name = request.body.first_name
    const email = request.body.email
    const password = request.body.password

    if(!name && !email && !password){
        return response.status(422).json({
            error: "Yo everything is empty"
        })
    }

    bcrypt.hash(password, saltRounds, function(err, hash) {

        if(err) console.log();

        if(!name){
            return response.status(422).send({
                error:"Name must be filled"
            })
        }
        else if(!password){
            return response.status(422).json({
                error:"Password must be filled"
            })
        }else if(!email){
            return response.status(422).json({
                error:"Email must be filled"
            })
        }

        let user = new User({
            first_name: name,
            email: email,
            password: hash,
        });

        user.save(function(err,newUser){           
            
            if(err){
                    console.log(err)                
                    response.status(404).json({
                    message: err
                })
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

      });
}

module.exports.users = function(request,response){
    
    let friendList = []

    FriendShip.find({"follower":request.params.id}).select("followee").exec(function(err,friends){

        friends.forEach(element => {
            friendList.push(element.followee)
        });
        if(err){
            response.json({error:err})
        }else{
            friendList.push(request.params.id)
            console.log(friendList)
            User.find({'_id':{ $nin:friendList},'active':true}).select('first_name blur bio hobbies').exec(function(err,users){

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
