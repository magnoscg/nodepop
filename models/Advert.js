'use strict';

const moongoose = require('mongoose');

//Advert Model definition

const advertSchema = moongoose.Schema({

    name: String,
    sale: Boolean,
    price: Number,
    photo: String,
    tags: [String]
});

//Model creation
const Advert = moongoose.model('Advert',advertSchema);

//Model exports

module.exports = Advert;
