const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const fs = require('fs');
const validate = require('mongoose-validator');

let nameValidator = [
    validate({
      validator: 'isLength',
      arguments: [2, 10],
      message: 'Name should be between 2-10 characters'
    }),
    validate({
        validator: 'matches',
        arguments: /^[a-zA-Z\-]+$/i,
        message: 'Name should contain characters only'
    })
  ];

let userSchema = mongoose.Schema({

    first_name:{
        type: String,
        trim: true,
        lowercase: true,
        require: [true, "Name cannot be empty"],
        validate: nameValidator,
    },
    email:{
        type: String,
        trim: true,
        required: true,
        lowercase: true,        
        unique: true,
        validate: {
            validator: function(email){
                return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
            },
            message: "Email is invalid."
        },
    },
    birthday:{
        type: Date,
        require: true,
    },
    password:{
        type: String,
        trim: true,      
        require: true,
        minlength: [5,"Password Must Be Longer Than 5 Characters"],
    },
    latitude:{
        type: String,  
        trim: true,              
    },
    longitude:{
        type: String,
        trim: true,              
    },
    image:[{
        type: String,
    }],
    blur:{
        type: String,
        default: '',
    },
    bio:{
        type: String,
        default: '',
    },
    activity:{
        type: String,
        default: '',
        trim: true,       
        lowercase: true,
    },
    active:{
        type: Boolean,
        default: false,
    },
    resettoken:{
        type: String,
        require:false,
    },
    hobbies:[{
        type: String,
        trim: true,        
    }],
    notification:{
        type: Boolean,
        default: true,
    }
},{
    timestamps: true,   
});

mongoose.model("User",userSchema);