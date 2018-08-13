let mongoose = require('mongoose');
let bcrypt = require("bcrypt");
let Schema = mongoose.Schema;

let userSchema = mongoose.Schema({

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
	friendList:[{
        // type: Schema.Types.ObjectId,
        type: Schema.Types.ObjectId,
        ref:"User"
    }],
},{
    timestamps: true,   
});

validateEmail = function(email) {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

mergeSort = function(friendList){
    if(friendList.length < 2){
        return friendList
    }

    let middle = Math.floor(friendList.length/2);
    let left = friendList.slice(0,middle);
    let right = friendList.slice(middle);

    return merge(left,right)
}

function merge(left,right){
    
    let result = []
    let indexLeft = 0;
    let indexRight = 0;
    // console.log(left[indexLeft][0].updatedAt.getTime(),right[indexRight][0].updatedAt.getTime())

    while(indexLeft < left.length && indexRight < right.length){
        if(left[indexLeft][0].updatedAt.getTime() < right[indexRight][0].updatedAt.getTime()){
            result.push(left[indexLeft])
            indexLeft++
        }else{
            result.push(right[indexRight])
            indexRight++
        }
    }

    result.concat(left.slice(indexLeft)).concat(right.slice(indexRight))
    console.log(result)
    return result
}

sort = function(friend,array){
    let x = 0
    if(array.length === 0){
        array.push(friend)
        return array
    }else{
        while(x < array.length){

            console.log()
            x++
        }
    }
    return array
}

userSchema.methods.generateHAsh = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};
  
userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

userSchema.pre("save", function(done){

    if(!this.isModified(this.password)) return done()

    this.password = this.generateHAsh(this.password)
    done()
});
  
mongoose.model("User",userSchema);
