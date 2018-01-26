var User = require('../models/users');
var jwt = require('jsonwebtoken');
var bcrypt = require("bcrypt");

exports.register = function(req, res) {
    if(Object.keys(req.body).length === 0 || !(Object.keys(req.body).length === 4)) {
        //check for the data in the request body
        res.status(400).send({
            success: false, 
            message: "All user credentials must be provided."
        });
    }
    var user = new User(req.body);
    user.hash_password = bcrypt.hashSync(req.body.password, 10);
    user.save(function(err, data) {
        if(err) {
            //console.log(err);
            res.status(500).send({
                success: false, 
                message: "Some error occurred while creating the Note."
            });
        } else {
            //console.dir(data)
            res.status(201).json({
                success: true,
                message: req.body.first_name + " has successfully registered.",
                email: req.body.email
            });
        }
    });
};

exports.test = function(req, res) {
    // route for testing register
    var user = new User({
        first_name: "john", 
        last_name: "kagga",
        password: "password",
        email: "john@mail.com"
    });

    user.save(function(err, data) {
        //console.log(data);
        if(err) {
            console.log(err);
            res.status(500).send({
                success: false, 
                message: "Some error occurred while creating the Note."
            });
        } else {
            console.log('User saved successfully');
            res.status(201).send(data);
        }
    });
};


exports.login = function(req, res) {
    if(Object.keys(req.body).length === 0 || !(Object.keys(req.body).length === 2)) {
        //check for the data in the request body
        res.status(400).send({
            success: false, 
            message: "All user email and password must be provided."
        });
    }
    User.findOne({
        email: req.body.email
      }, function(err, user){
        if(err) console.log(err);
        if (!user) {
            res.status(404).json({ 
                success: false, 
                message: 'Authentication failed. User not found.' 
            });
            } else if (user) {
                if (!user.comparePassword(req.body.password)) {
                    res.status(403).json({
                        success: false, 
                        message: 'Authentication failed. Wrong password.'
                    });
                } else {
                    res.status(200).json({
                        success: true,
                        message: 'You have successfully logged in.',
                        token: jwt.sign({ email: user.email, first_name: user.first_name, _id: user._id}, 'RESTFULAPIs')
                    });
                } 
            }
        }
    );
};