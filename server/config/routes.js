let users = require("../controllers/userController")

module.exports = function(app){
    
    app.post("api/users/login",users.login)
    app.post("spi/users/signup",users.signUp)
    
}