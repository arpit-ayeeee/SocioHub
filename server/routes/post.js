//This route is for posting stuff
const express = require('express');
const postRouter = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const Post = mongoose.model('Post');


//Fetching the post
postRouter.get('/allpost', requireLogin, (req, res) => {
    Post.find()                                                 //Cause we want all the posts
        .populate('postedBy',"_id name")                        //So that we'll get _id and name of the user raher than just the objectId. The first para tells which component and second tell the part to be displayed
        .then(posts => {
            res.json({posts})
        })
        .catch(err => {
            console.log(err);
        })
})

//Posting the post
postRouter.post('/createpost', requireLogin, (req, res) => {    //Only registered users can post
    const { title, body} = req.body;
    if(!title || !body){                                        //If title or body isnt present, then we'll throw error
        return res.status(422).json({error: "Please enter all the fields"});
    }
    
    req.user.password = undefined;                              //This wont allow to store user's pasword in the postedBt field of the post schema
    const post = new Post({
        title,
        body,
        postedBy: req.user                                      //This will have the whole data of user, as the middleware after verifying the user from the token, it will add the user's data to req
    }); 
    post.save()                                                 //Then we'll save the post and return the result or catch if there is a mistake
        .then(result => {
            res.json({post: result});
        })
        .catch(err => {
            console.log(err);
        })
})


module.exports = postRouter;