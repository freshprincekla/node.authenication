"use strict";

var express = require("express");
var jsonParser = require("body-parser").json;
var mongoose = require("mongoose");
var dbConfig = require("./config/database");
var logger = require("morgan");
var app = express();

app.use(logger("dev"));
app.use(jsonParser());

//database connection 
//console.log(dbConfig.url);
mongoose.connect("mongodb://localhost:27017/users");
var db = mongoose.connection;
db.on('error', function(err) {
    console.log(err);
    //
});

db.once('open', function() {
    console.log("Successfully connected to the database");
    db.close();
})
// define a simple route
app.get('/', function(req, res){
    console.log(req.body);
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

// listen for requests
app.listen(3000, function(){
    console.log("Server is listening on port 3000");
})