let mongoose = require('mongoose');
let User = mongoose.model('User');

module.exports.login = function(request,response){
    console.log("Login Info",request.body);

}

module.exports.registration = function(request,response){
    console.log("Reg Info",request.body);
    
}