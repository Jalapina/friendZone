let users = require("../controllers/userController");
let messages = require("../controllers/messageController");
let friendships = require("../controllers/friendShipController")

module.exports = function(app){
    
    //Users
    app.post('/api/users/authenticate', users.authenticate)
    app.post('/api/users/create', users.create)
    app.put('/api/users/edit',users.edit)
    app.put('/api/users/useractivation',users.userActivation)
    app.get('/api/users/users/:id', users.users)
    app.get('/api/users/:id',users.user)

    //Token Authentication 
    app.get('/api/me',users.authToken)
    app.use(users.tokenDecode)
    
    //Chat
    app.get('/api/messages/:sender/:reciever',messages.getMessages)
    app.post('/api/messages/create',messages.create)

    //Friendships
    app.post('/api/friendships',friendships.create)
    app.get('/api/friendships/:id',friendships.friends)
}
