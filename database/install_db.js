'use strict'
const mongoose = require('mongoose');
const exampleAdverts = require('./adverts_example.json').adverts;
const Advert = require('../models/Advert');

mongoose.connection.on('error', err =>{ // If there is an error connecting to Mongo
    console.log('Error connection to Mongodb:  \n', err);
    process.exit(1) // The server stops
});


//Connection to the database
mongoose.connect('mongodb://localhost/nodepop',{ useNewUrlParser: true });

mongoose.connection.once('open',() => {
    console.log('*********  Connection established  ************');

    //remove all collections first

    Advert.deleteMany({}, err => {
        if(err){
            console.log('Collections have not been removed');
            return err;
        };
        console.log('Older Collections removed')
    });

    saveExampleCollections(exampleAdverts);

    
});   




function saveExampleCollections (exampleAdverts) {
    Advert.create(exampleAdverts,(err,advertSaved) => {
        if(err){
            return err;
        }
        console.log("Example Collection saved",advertSaved);
        mongoose.connection.close();
    });
};