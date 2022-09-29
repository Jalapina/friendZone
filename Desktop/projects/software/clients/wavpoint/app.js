"use strict";
const express = require("express");
const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
const app = express();
const port = process.env.port || 8000;
const path = require("path")
// https://expressjs.com/en/4x/api.html#express.static
app.use(cors);

let options = {
  dotfiles: "ignore", //allow, deny, ignore
  etag: true,
  extensions: ["htm", "html"],
  index: false, //to disable directory indexing
  maxAge: "7d",
  redirect: false,
  setHeaders: function(res, path, stat) {
    //add this header to all static responses
    res.set("x-timestamp", Date.now());
  }
};
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static("public", options));
//you can use https://favicon.io/favicon-generator/ to create the favicon.ico

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname,"/public/index.html"));
});

app.get("/goodmistakes", (req, res) => {
  res.sendFile(path.join(__dirname,"/public/single.html"));
});

app.listen(port, err => {
  if (err) {
    return console.log("ERROR", err);
  }
  console.log(`Listening on port ${port}`);
});

exports.app = functions.https.onRequest(app);
