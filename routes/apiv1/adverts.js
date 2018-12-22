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
    try {
        //Request data of the new Advert
        const advertData =req.body;
        //Create new Advert
        const advert = new Advert(advertData);
        //Save advert in the database
        await advert.save();
        res.json({success: true,result: advert});
    }catch(err){
        next(err);
        return;
    }
})


//router exports
 module.exports = router;