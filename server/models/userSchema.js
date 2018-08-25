let mongoose = require('mongoose'),
    Schema = mongoose.Schema;
let validate = require('mongoose-validator'); // Import Mongoose Validator Plugin
    

let userSchema = mongoose.Schema({
    first_name:{
        type: String,
        require: [true,"Name cannot be empty"],
        minlength: 2,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        require: true,
        minlength: 6,
    },
    blur:{
        type: String,
        default: '',
    },
    bio:{
        type:String,
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
	friendList:[{
        userId:{
            type: Schema.Types.ObjectId,
            ref:"User"
        },
        status:{
            type:Boolean,
        }
    }],
},{
    timestamps: true,   
});

mongoose.model("User",userSchema);
