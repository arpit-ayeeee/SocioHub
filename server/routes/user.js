//This route is for finding other users stuff
const express = require('express');
const userRouter = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const Post = mongoose.model('Post');
const User = mongoose.model('User');

//Route to get the details of the user from the id entered by the user
userRouter.get('/user/:id', requireLogin, (req, res) => {         //Here, when a user searches for another, it'll provide the user name, from which we;ll get the user id
    User.findOne({_id:req.params.id})
        .select("-password")                        //If we find the user, we'll get all it's deets, so we'll remove the password
        .then(user => {                            
            Post.find({postedBy:req.params.id})   //Then we'll also find the posts created by the user
                .populate("postedBy", "_id, name")
                .exec((err, posts) => {
                    if(err){
                        return res.status(422).json({error: err})
                    }
                    res.json({user,posts})
                })
        })
        .catch(err => {
            return res.status(404).json({error: "User not found"});
        })
})

//Route to follow another user
userRouter.put('/follow', requireLogin, (req, res) => {
    User.findByIdAndUpdate(req.body.followId, {                          //This is the id of the user who got followed and update that user's follow schema by adding the id of curent user
        $push : {followers: req.user._id}                                 //This is the id of the loggedin/current user
    },
    {
        new: true
    },
    (err, result) => {
        if(err){
            return res.status(422).json({error: err})
        }
        User.findByIdAndUpdate(req.user._id, {                          //Once the current user is added to followers of that user, now we'll the current user and add that user of the following part of current user's schema
            $push: {following: req.body.followId}                   
        },
        {
            new: true                                                   //We use new:true, to return the document after the update was applied
        })
        .select("-password")                  //cause we need to remove the password
        .then(result => {
            return res.json(result)
        })
        .catch(err => {
            return res.status(422).json({error: err})
        })
    }
    )          
})



//Route to unfollow another user
userRouter.put('/unfollow', requireLogin, (req, res) => {
    User.findByIdAndUpdate(req.body.unfollowId, {                          //This is the id of the user who got unfollowed and update that user's follow schema by pulling the id of current user
        $pull : {followers: req.user._id}                                 //This is the id of the loggedin/current user and that'll get pulled
    },
    {
        new: true
    },
    (err, result) => {
        if(err){
            return res.status(422).json({error: err})
        }
        User.findByIdAndUpdate(req.user._id, {                          //Once the current user is added to followers of that user, now we'll take current user and pull sthat user of the following part of current user's schema
            $pull: {following: req.body.unfollowId}                   
        },
        {
            new: true
        })  
        .select("-password")                //cause we need to remove the password
        .then(result => {
            return res.json(result)
        })
        .catch(err => {
            return res.status(422).json({error: err})
        })
    }
    )          
})

//Rouute to update the dp
userRouter.put("/updatePic",requireLogin, (req, res) => {
    User.findByIdAndUpdate(req.user._id,
        {$set: {pic: req.body.pic}},                //We'll update the database
        {new: true},
        (err, result) => {
            if(err){
                return res.status(422).json({error:"Pic cant be posted"})
            }
            res.json(result);
        })
})

module.exports = userRouter;