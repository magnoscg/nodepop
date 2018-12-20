'use strict'

//Using mongoose module
const mongoose = require('mongoose');

/**
 * Mongoose connection
 */

 
mongoose.connection.on('error', err =>{ // If there is an error connecting to Mongo
    console.log('Error connection to Mongodb', err);
    process.exit(1) // The server stops
});

mongoose.connection.once('open', () =>{ //if the connection is successful
    console.log('Connection established to', mongoose.connection.name);
    
});
//Connection to the database
mongoose.connect('mongodb://localhost/nodepop',{ useNewUrlParser: true });

//conection exports
module.exports = mongoose.connection;