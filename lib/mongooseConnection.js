'use strict'

//Using mongoose module
const mongoose = require('mongoose');

//use environment variable to connect nodepop database with authentication
var databaseUri = process.env.DATABASE_URI || 'mongodb://localhost/nodepop';

if (!databaseUri) {
        console.log('DATABASE_URI not specified, falling back to localhost.');

}

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
mongoose.connect(databaseUri,{ useNewUrlParser: true });
//To create an index to the database
mongoose.set('useCreateIndex', true);

//conection exports
module.exports = mongoose.connection;
