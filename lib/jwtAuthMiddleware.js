'use strict'

const jwt = require('jsonwebtoken');

//Create a middleware to authenticate users

module.exports = () => {
    return (req,res,next) =>{
        //recover token
        const token = req.body.jwttoken || req.query.jwttoken || req.get('x-access-token');

        //No token provided
        if (!token) {
            const err = new Error ('No token provided');
            err.stattus = 401;
            next(err);
            return;
        }

        //Verify token
        jwt.verify(token,process.env.JWT_SECRET,(err,decodedToken) =>{
            if(err){
                next(new Error('Invalid token'));
                return;
            }
            //save token in user_id
            req.user_id = decodedToken.user_id;
            next();
        });
    };
};