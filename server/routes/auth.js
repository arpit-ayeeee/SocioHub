const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcryptjs');


//Signup Route
router.post('/signup', (req,res) => {                         //Signup page post route
    const {name, email, password} = req.body;

    if(!email || !password || !name){                        //Validation
        return res.status(422).json({error : "Please enter all the fields"});
    }

    User.findOne({email: email})                              //We'll check if user already exists
    .then((savedUser) => {
        if(savedUser){
            return res.status(422).json({error: "User already exists"});
        }
        bcrypt.hash(password, 12)                             //We'll encrypt the password into 12 letter encoded format and the send it
        .then(hashedpassword => {
            const user =  new User({                          //Saving the new user
                email,
                password: hashedpassword,
                name,
            });
            user.save()
            .then(user => {
                res.json({message: "Saved successfuly"});
            }) 
            .catch(err => {
                console.log(err);
            })
        })
        c
    })
    .catch(err => {
        console.log(err);
    })
})

//Signin or Login Route
router.post('/login', (req, res, next) => {
    const {email, password} = req.body;

    if(!email || !password){
        res.status(422).json({error: "Please enter email or password"});
    }

    User.findOne({email: email})
    .then(savedUser => {
        if(!savedUser){
            return res.status(422).json({error: "Invalid email or password"});
        }
        else{
            bcrypt.compare(password, savedUser.password)                    //We'll compare the passkey provided by the user with the saved password in our database
            .then(doMatch => {
                if(doMatch){
                    res.json({message: "Successfully signed in "});
                }
                else{
                    return res.status(422).json({error: "Invalid email or password"});
                }
            })
            .catch(err => {
                console.log(err);
            })
        }
    })
})


module.exports = router;


