let users = require("../controllers/userController");
let messages = require("../controllers/chatController");

module.exports = function(app){
    
    //Users
    app.post('/api/users/authenticate', users.authenticate)
    app.post('/api/users/create', users.create)
    app.put('/api/users/edit',users.edit)
    app.get('/api/users/users', users.users)
    app.get('/api/users/:id',users.user)

    //Token Authentication 
    app.get('/api/me',users.authToken)
    app.use(users.tokenDecode)
    
    
}