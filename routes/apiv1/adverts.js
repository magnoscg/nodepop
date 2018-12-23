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

    //Recovering params
    const name = req.query.name;
    const sale = req.query.sale;
    const price= req.query.price;
    const tag = req.query.tags;
    const fields =req.query.fields;
   
    //using this var to filter by querys
    const filter = {};

    //limit the results finded
    const limit = parseInt(req.query.limit);
    //skip the results finded
    const skip = parseInt(req.query.skip);
    //sort the results finded
    const sort = req.query.sort;

    //find by name or starting by....
    if(name) {
        filter.name = new RegExp('^' + req.query.name,"i");
        console.log(filter.name);
        
    };

    //find by tag
    if(tag){
        filter.tags = { '$in': tag };
        console.log(filter.tags);
        
    };
    //find by sale, true or false
    if(sale){
        filter.sale = sale;
    };
    //console log is only for test
    if(price){  

        console.log(price);
        let priceDivided= price.split('-');
        console.log(priceDivided);
        //Parse to Float all Array
        let PriceArray = priceDivided.map(parseFloat);
        console.log(PriceArray);
        
        //If array only has a number
        if(PriceArray.length === 1){
            filter.price = parseFloat(PriceArray[0]);
            console.log(filter.price);


        //if in the Array there are two numbers    
        }else if(!isNaN(PriceArray[0]) && !isNaN(PriceArray[1])){
            // greater or equal than the first number and less or equal than the second number
            filter.price = {$gte: PriceArray[0], $lte: PriceArray[1]};
            console.log(filter.price);

        //if only first index is a number
        }else if(!isNaN(PriceArray[0])){
            //greater or equal than number
            filter.price ={$gte: PriceArray[0]};


        //if only second index is a number    
        }else if (!isNaN(PriceArray[1])) {
            filter.price = {$lte: PriceArray[1]};
        };
    };

    //find by query
    const query= Advert.find(filter);

    query.limit(limit);
    query.skip(skip);
    query.select(fields);
    query.sort(sort);
    

    query.exec((err,list) => {
        if(err){
            next(err);
            return;
        }
        res.json({success: true,results: list});
    });
});

//Post to create new Adverts
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