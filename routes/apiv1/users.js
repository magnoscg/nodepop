'use strict';

//Loading modules
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const bcrypt = require('bcrypt');
/**
 * POST /users/login
 * Autenthicate user
 */
router.post('/authenticate', async (req,res,next)=> {
    try {
        
        const email = req.body.email;
        const password = req.body.password;

        //Find the user
        const user = await User.findOne({email: email}).exec();
        const passwordDecrypted = await bcrypt.compare(password,user.password);

        //
        if(!user || !passwordDecrypted){ //res.__ (translations in locals)
            res.json({success: false, error: res.__('invalidCredentials')});
            return;
        }
        
        //Create a token
        jwt.sign({user_id: user._id}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRATION
        }, (err , token) =>{
            if(err){
                next(err);
                return;
            }
            res.json({success:true ,token});
        });

    }catch(err){
        next(err);
        return;
    };
});

/**
 * POST /users/register
 * Register user
 */

router.post('/register',async (req,res,next)=> {
    try {
        //Request data of the new Advert
        const userData =req.body;
        const email = req.body.email;
        
        const findUser = await User.findOne({email: email}).exec();
        
        
        //if exists email, the user will not been register
        if(findUser){                          //res.__ (translations in locals)
            res.json({success: false , error: res.__('Email already Registered')});
            return;
        }
        //Create new Advert
        const user = new User(userData);
        //Save advert in the database
        await user.save();
        res.json({success: true,result: user});
    }catch(err){
        next(err);
        return;
    }
});

 module.exports = router;