const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');


router.get('/', (req, res, next) => {
    res.send('hello');
})

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
        const user =  new User({                              //Saving the new user
            email,
            password,
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
    .catch(err => {
        console.log(err);
    })
})


module.exports = router;


