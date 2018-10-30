const express = require("express");
const morgan = require('morgan');
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

require("./server/config/mongoose");
const userRoutes = require("./server/controllers/userController")
const messageRoutes = require("./server/controllers/messageController")
const friendShipRoutes = require("./server/controllers/friendShipController")

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/client/dist'));
app.use('/uploads',express.static('uploads'));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
});

app.use('/api',userRoutes);
app.use('/api',messageRoutes);
app.use('/api',friendShipRoutes);

app.all('*',(req,res,next) =>{
    res.sendfile(path.resolve('./client/dist/index.html'))
});

app.listen(8000, function(){});