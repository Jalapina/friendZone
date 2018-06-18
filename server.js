let express = require("express");
// let morgan = require('morgan');
let bodyParser = require("body-parser");
let path = require("path");
let app = express();

// app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/client/dist'));

require("./server/config/mongoose");
require("./server/config/routes")(app);

app.all('*',(req,res,next) =>{
    res.sendfile(path.resolve('./client/dist/index.html'))
});

app.listen(8000, function(){
    console.log('Running on port 8000')
});

