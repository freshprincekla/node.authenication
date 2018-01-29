"use strict";
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var logger = require("morgan");
var app = express();
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//database connection 
//console.log(dbConfig.url);

var dbConfig = require("./config/database");
mongoose.connect(dbConfig.url);
app.set('superSecret', dbConfig.secret )
var db = mongoose.connection;
db.on('error', function(err) {
    //console.log(err);
    process.exit();
});

db.once('open', function() {
    //console.log(1);
    console.log("Successfully connected to the database");
    //db.close();
})
// define a simple route
app.get('/', function(req, res){
    //console.log(req.body);
    //console.log(3);
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

require("./app/routes/routes")(app)

// listen for requests
app.listen(3000, function(){
    console.log("Server is listening on port 3000");
})

module.exports = app