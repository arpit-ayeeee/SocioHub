//In this file, we'll verify the user's token with our token, in order to provide access to the restricted resources
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../keys');                                  //Getting the secret key  
const mongoose = require('mongoose');                                     //Getting mongoose
const User = mongoose.model("User");                                      //Getting the schema

module.exports = (req, res, next) => {
    const {authorization} = req.headers;
    //authorization === Bearer bdoqwbbcibweifoqf;  This is what authorization will look like, so in order to check the token we first have to remove the Bearer word from it

    if(!authorization){
        return res.status(401).json({error: "You must be logged in"});
    }
    const token = authorization.replace("Bearer ", "");                   //Here we'll replace Bearer with an empty string, cause we just need to access the token in order to compare it
    jwt.verify(token, JWT_SECRET, (err, payload) => {                     //It will verify the token given by the user with the secret key, and will return err or payload
        if(err){
            return res.status(401).json({error: "You're not authorised"});
        }                                                                 //Status 401 means unauthorised
        const {_id} = payload;                                            //The payload will have the id too
        User.findById(_id)                                                //Now we'll find the user by the id provided in the payload which we provided in the token
            .then(userdata => {                                 
                req.user = userdata;                 
                next();                                                            //In order to continue to next middleware                     
       })
    })

}