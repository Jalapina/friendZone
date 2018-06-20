var mongoose = require('mongoose');
var bcrypt = require("bcrypt");

var userSchema = mongoose.Schema({

    first_name:{
        type: String,
        require: true,
    },
    email:{
        type: String,
        required: true,
        // unique: true,
        // validate: {
        //     validator: function(value){
        //         return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
        //     },
        //     message: "Email is invalid."
        // },
    },
    password:{
        type: String,
        require: true,
        // minlength: 5,
    },
    blur:{
        type: String,
        default: '',
    },
    bio:{
        type:String,
        require: true,
        default: '',
    },
    activity:{
        type:String,
        default: '',
    },
    active:{
        type: Boolean,
        default: false,
    },
    hobbies:[{
        type:String,
    }],
},{
    timestamps: true,   
});

userSchema.methods.generateHAsh = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};
  
userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

userSchema.pre("save", function(done){
    this.password = this.generateHAsh(this.password)
    done()
});
  
validateEmail = function(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }


mongoose.model("User",userSchema);
