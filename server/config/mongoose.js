var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/friendzone", function (err) {
    if (err) {
        console.log(err);
    }
});

require("../models/userSchema");
require("../models/messageSchema");
require("../models/friendshipSchema");