'use strict'
const mongoose = require('mongoose');

//Recover Adverts Model and example collection
const exampleAdverts = require('./adverts_example.json').adverts;
const Advert = require('../models/Advert');

//Recover User model and example user
const exampleUser = require('./user_example.json').user;
const User = require('./../models/User');


// If there is an error connecting to Mongo
mongoose.connection.on('error', err =>{ 
    console.log('Error connection to Mongodb:  \n', err);
    process.exit(1) // The server stops
});


//Connection to the database.
mongoose.connect('mongodb://localhost/nodepop',{ useNewUrlParser: true });

mongoose.connection.once('open',() => {
    console.log('*********  Connection established  ************\n');

    //remove all collections first

    Advert.deleteMany({}, err => {
        if(err){
            console.log('Collections have not been removed.');
            return err;
        };
        console.log('Older Collections removed.\n');
    });

    saveExampleCollections(exampleAdverts);
    saveExampleUser(exampleUser);
    
});   



//function to save example collection into the database
function saveExampleCollections (exampleAdverts) {
    Advert.create(exampleAdverts,(err,advertSaved) => {
        if(err){
            console.log("The Example collection have not been saved.");
            return err;
        }
        console.log("Example Collection has been saved into the database.\n\n",advertSaved,"\n");
        
    });
};

function saveExampleUser (exampleUser) {
    User.create(exampleUser, (err, userSaved) => {
        if(err){
            console.log("The user have not been saved.");
            return err;
        }
        console.log("The example User has been saved into the databse.\n\n",userSaved,"\n");
        
        mongoose.connection.close();
    });

};