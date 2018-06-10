let users = require("../controllers/userController");
let messages = require("../controllers/chatController");

module.exports = function(app){
    
    app.post('/api/users/authenticate', users.authenticate)
    app.post('/api/users/create', users.create)

    app.use(users.authToken)
    app.get('/api/users/me', users.tokenDecode)
    
    
}