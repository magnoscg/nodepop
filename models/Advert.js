'use strict';

const moongoose = require('mongoose');

//Advert Model definition

const advertSchema = moongoose.Schema({

    name: {type: String,index: true},
    sale: {type: Boolean,index: true},
    price: { type: Number,index: true},
    photo: { type: String, index: true},
    tags: {type:[String],index: true},
});


//Model creation
const Advert = moongoose.model('Advert',advertSchema);


 //TEST to save an advert
 
/*const advert = new Advert({name: "Bicycle",
                            sale: true,
                            price: 230.15,
                            photo: "images/advert/bicyle",
                            tags: ["lifestyle" , "motor"]});
advert.save();*/
 


//Model exports
module.exports = Advert;
