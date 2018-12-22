'use strict';

const moongoose = require('mongoose');

//User Model definition
const userSchema = moongoose.Schema({

    name: String,
    email: String,
    pass: String
});

//Create the User model
const User = moongoose.model('Users',userSchema);


module.exports = User;