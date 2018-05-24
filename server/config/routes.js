let users = require("../controllers/userController")

module.exports = function(app){
    
    app.post("api/users/authenticate", users.authenticate)
    app.post("spi/users/create", users.create)
    
}