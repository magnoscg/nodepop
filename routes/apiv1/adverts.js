'use strict';

//Loading modules
const express = require('express');
const router = express.Router();


//Loading Mongoose to use Advert Model

const Advert = require('../../models/Advert');

/**
 * GET /adverts 
 * 
 * Get a list of Adverts
 */
router.get('/', (req,res,next) => {
    Advert.find().exec((err,list) => {
        if(err){
            next(err);
            return;
        }
        res.json({success: true,results: list});
    });

});



/**
 * 
 * POST /adverts
 * Create an advert in the database
 */
router.post('/',async (req,res,next)=> {
    try{
        //Request data of the new Advert
        const AdvertData =req.body;
        //Create new Advert
        const Advert = new Advert(AdvertData);
        //Save advert in the database
        await Advert.save();
        res.json({success: true});
    }catch(err){
        next(err);
        return;
    }
})


//router exports
 module.exports = router;