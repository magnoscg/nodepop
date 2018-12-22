'use strict';

const moongoose = require('mongoose');

//User Model definition
const userSchema = moongoose.Schema({

    name: {type: String,index: true},
    email: {type: String,index: true},
    pass: String
});

//Create the User model
const User = moongoose.model('Users',userSchema);


module.exports = User;