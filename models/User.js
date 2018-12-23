'use strict';

const moongoose = require('mongoose');
const bcrypt = require('bcrypt');

//User Model definition
const userSchema = moongoose.Schema({

    name: {type: String,index: true},
    email: {type: String,index: true},
    password: {type: String}
});


//hash user password before saving into database
userSchema.pre('save', async function(next){
    try {
        //generate a salt
        const salt = await bcrypt.genSalt(10);
        //generate a password hash
        const hashedPassword = await bcrypt.hash(this.password,salt);

        /*Testing hash
        console.log('salt',salt);
        console.log('normal pass' , this.password);
        console.log('passhash', hashedPassword);*/

        //save the hash into the password
        this.password = hashedPassword;
        next();    
    }catch(error) {
        next(error);
    }
});



const User = moongoose.model('User',userSchema);

/*Testing bcrypt pass
const newuser = new User({name: "pepe",
                        email: 'pepe@example.com',
                        pass: '1234'});
newuser.save();
*/

module.exports = User;