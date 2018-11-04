const mongoose = require('mongoose');
const express = require('express')
const multer = require('multer');
const fs = require('fs');
const router = express.Router();
const User = mongoose.model('User');
const FriendShip = mongoose.model('FriendShip');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2')
const inLineCss = require('nodemailer-juice');
const secret = 'idontmake11time1996for107you2012';

const store = multer.diskStorage({
    destination:function(request,file,cb){
        cb(null, './uploads/');
    },
    filename:function(request,file,cb){
        cb(null, new Date().toISOString()+'.'+file.originalname);
    },
});

const fileFilter = (request, file, cb) => {
    if(file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/jpg" ){
        cb(null, true);
    }else{
        cb(null, false);        
    }
}

const upload = multer({
    storage: store,
    limits: 1024 * 1024 * 5,
    fileFilter: fileFilter
});



router.post('/users/authenticate', function(request,response){

    const email = request.body.email
    const password = request.body.password
    console.log(request.body)
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
                message:"Email does not exist"
            });
        }else{ 
            const hash = user.password

            bcrypt.compare(password, hash, function(err, res) {
                
                if(err) console.log(err);

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
}); 

router.post('/users/create', function(request,response){

    const name = request.body.first_name
    const email = request.body.email
    const password = request.body.password
    const birthday = request.body.birthday

    if(!name && !email && !password){
        return response.status(422).json({
            error: "Yo everything is empty"
        });
    }

    bcrypt.hash(password, saltRounds, function(err, hash) {
        
        if(err) console.log(err);

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
            birthday:birthday,
        });

        user.save(function(error,newUser){ 

            if(error){

                if(error.errors !== undefined){

                    if(error.errors.email){
                        return response.status(422).json({
                            message:error.errors.email.properties.message
                        });
                    }else if(error.errors.first_name){
                        return response.status(422).json({
                            message:error.errors.first_name.properties.message
                        });
                    }else if(error.errors.password){
                        return response.status(422).json({
                            message:error.errors.password.properties.message
                        });
                    }else {
                        return response.status(422).json({
                            message: error
                        });
                    }

                }else if(error){

                    if (error.code == 11000) {
                        return response.status(404).json({
                            message: "Email already exist"
                        });
                    }else{
                        response.json({ success: false, message: err });
                    }
                }
            }else{
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
});

router.post('/passwordresetrequest', function(request,response){

    User.find({email:request.body.email},function(err,user){

        _user = user[0]
        console.log(_user)
        console.log(_user)
        if(err) console.log(err);
        else if(user.length < 1){
            response.json({
                message:"User does not exist"
            });
        }else{

            _user.resettoken = jwt.sign({ id: _user._id}, secret,{ expiresIn: '24h' });
            
            _user.save(function(err){
                const transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    auth: {
                      type: 'OAuth2',
                      user: 'davidpina14@gmail.com',
                      clientId: '915853818827-60rrr75hahp9p3ssth8logb819u2ocno.apps.googleusercontent.com',
                      clientSecret: 'rC7kHod8t14G4R5tURaFPk7e',
                      refreshToken: '1/yiFzvia1bR11nWhNCGKJQO67jJlrlDEOD35W7ecJRNQ',
                    }
                  });
                
                transporter.use('compile', inLineCss());

                let mailOptions = {
                    from: '"friendZone Team" <no-reply@gmail.com>', // sender address
                    to: user[0].email, // list of receivers
                    subject: 'FriendZone Password Reset Request', // Subject line
                    text: 'Hello world?', // plain text body
                    html: '<style> h1{ cursor: default; } .container{background: #e0e0e0;width: 100%; height: 440px;text-align: left;} .inner{ margin: auto;width: 300px; padding:10px; background: #ffcc80; height: 93%;} .message{font-size: 20px; font-weight: bold; margin-bottom: 40px; padding: 5px; cursor: default;} .link{text-decoration: none; border: 1px solid #fff; color: #fff; border-radius: 25px; padding: 15px; background: brown; } .name{text-transform:UPPERCASE}</style><div class="container"> <div class="inner"><h1>Password Reset Link</h1><p class="message">If you requested a password reset for <span class="name">'+_user.first_name+'</span>, click the link. If it was not you... ummm</p><a class="link" href="http://localhost:8000/password_reset/token/'+ _user.resettoken+'">Reset Password</a></div></div>'
                };
            
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }else{
                        response.json({
                            success:true
                        });
                    }
                });
            });
        }
    });
});

router.get('/passwordReset/token/:id', function(request,response){
    console.log(request.params.id)
    User.findOne({"resettoken":request.params.id}).select("first_name image").exec(function(err,user){
        console.log(user)
        if(err){
            console.log(err)
        }else{
            response.json({
                user:user
            });
        }
    });
});

router.post('/passwordreset',function(request,response){
    console.log(request.body)
    User.findById(request.body._id, function(err,user){
        if(err) console.log(err);
        else{
            if(request.body.password == ""  && request.body.confirm_password == null){
                response.json({
                    message: "Password/s field is empty",
                    success: false
                })
            }else{
            bcrypt.hash(request.body.password, saltRounds, function(err, hash) {
                user.password = hash
                user.resettoken = false
                user.save(function(err){
                    if(err) console.log(err);
                    else{
                        response.json({
                            success: true,
                        });
                    }
                });
            });        
            }
        }
    });

});

router.use(function(request, response, next){
    
    var token = request.headers['authorization']

    if (!token) return response.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, secret, function(err, decoded) {
      if (err) return response.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        if (err) return response.status(500).send("There was a problem finding the user.");

        request.decoded = decoded

        next();
    
    });

});

router.get('/me',function(request,response) {
    response.send(request.decoded); 
});

router.get('/users/:id',  function(request,response){

    User.findById(request.params.id,{password:0,email:0,createdAt:0,updatedAt:0},function(err,user){
        if(err) return response.json({err:err,message:"NO USER"})

        response.json({
            user:user
        });
    });

});
router.get('/users/:term/activity', function(request,response){

    let friendList = []
    let user = request.decoded.id
    let userCord 
    friendList.push(user)

    User.findById(user,function(err,user){
        if(err){console.log(err)}
        
        userCord = {
            latitude:user.latitude,
            longitude:user.longitude
        }
        
        FriendShip.find({'users':user},function(err,friends){
            
                    friends.forEach(friend=>{
                        friend.users.forEach(function(id,index){
                                if(id != user){
                                friendList.push(id)
                            }
                        });
                    });
            
                    User.find({'_id':{ $nin:friendList},'activity':request.params.term,'active':true}).select('first_name blur latitude longitude bio image hobbies birthday').exec(function(err,users){
            
                        if(err){
                            console.log(err);
                        }else{
            
                            shuffleFriendList(users)
                            response.json({
                                users:users,
                                userCordinates:userCord
                            });
            
                        }
                    });
            
                    function shuffleFriendList(array){
                        let counter = array.length
            
                        if(counter > 0){
                            while(counter > 0){
            
                                let index = Math.floor(Math.random() * counter);
            
                                counter--
                                
                                let temp = array[counter];
                                array[counter] = array[index];
                                array[index] = temp;
            
            
                            }
            
                            return array;
                        }
                    }
                            
                });
    });

    

});
router.put('/users/edit', function(request,response){

    User.findById(request.decoded.id,function(err,user){
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
            
            user.save(function(err){
                if(err){
                    console.log(err);
                    response.status(404).json({
                        error:err,
                        message:"Error"
                    });
                }else{
                    FriendShip.remove({"users":request.decoded.id,"status":false},function(err){
                        if(err) console.log(err);
                        else{
                            response.json({
                                success:true                                
                            })
                        }
                    })
                }
            });
        }
    });

});
router.put('/users/useractivation', function(request,response){

    User.findById(request.decoded.id).exec(function(err,user){
        user.active = request.body.active
        user.save(function(err){
            if(err) response.json({error:err})
        });
    });

});

router.delete('/users/images/uploads/:term', function(request,response){

    User.findById(request.decoded.id, function(err,user){
        images = user.image
        string1 = "uploads/"
        file = string1.concat(request.params.term)
        let index = images.indexOf(file);
        
        if (index > -1) {
          images.splice(index, 1);
        }
        fs.unlink(file,function(err){ 
            if(err){
                console.log(err)
            }else{
                user.save(function(err){
                    response.json({
                        message:"Images deleted"
                    });
                });
            }
        });
    });

});

router.put('/users/images',upload.single("userImage"), function(request, response) {

    User.findById(request.decoded.id,function(err,user){
        
        if(err){
            console.log(err)
        }else{
            user.image.push(request.file.path)
            user.save(function(err,editUser){
                response.json({
                    image:editUser
                })
            })
            
        }
    });

});

router.put('/users/setlocation',function(request,response){

    User.findById(request.decoded.id,function(err,user){
        if(err) console.log(err);
        else{
            user.latitude = request.body.latitude
            user.longitude = request.body.longitude
            user.save(function(err){
                if(err) console.log(err);
                else(
                    response.json({
                        success:true,
                    })
                )
            })
        }
    })
})

router.delete('/users/delete',function(request,response){

    user = request.decoded.id
    
    User.findByIdAndRemove(user,function(err,user){
        
        if(err){
            console.log(err);
        }else{
            images = user.image
            images.forEach(file =>{
                fs.unlink(file,function(err){
                    if(err){
                        console.log(err)
                    }
                });
            });
            response.json({
                success: true,
                message: "User deleted",
            });
        }
    });

});



module.exports = router;