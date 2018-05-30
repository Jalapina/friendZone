let users = require("../controllers/userController")

module.exports = function(app){
    
    console.log("Server routes")
    
    app.post('/api/users/authenticate', users.authenticate)
    app.post('/api/users/create', users.create)
    
}