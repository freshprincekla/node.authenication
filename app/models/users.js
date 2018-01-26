"use strict";

var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
//console.log(2);
 
var UserSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    hash_password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        dropDups: true
    },
    }, {
        timestamps: true
    }
);

UserSchema.methods.comparePassword = function(password){
    console.log(this.hash_password); 
    return bcrypt.compareSync(password, this.hash_password);
}

module.exports = mongoose.model('User', UserSchema);