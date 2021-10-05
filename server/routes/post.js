//This route is for posting stuff
const express = require('express');
const postRouter = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const Post = mongoose.model('Post');


//Fetching the post
postRouter.get('/allposts', requireLogin, (req, res) => {        //Since the requirelogin middleware returns the userdata in the result, we'll use it here in the PostedBy part of the the schema
    Post.find()                                                 //Cause we want all the posts
        .populate('postedBy',"_id name pic") //So that we'll get _id and name of the user rather than just the objectId. The first para tells which component and second tell the part to be displayed
        .populate('comments.postedBy','_id name')
        .then(posts => {
            res.json({posts})
        })
        .catch(err => {
            console.log(err);
        })
})
//Fetching the posts of the user whom current user follows
postRouter.get('/followedposts', requireLogin, (req, res) => {        //Since the requirelogin middleware returns the userdata in the result, we'll use it here in the PostedBy part of the the schema
    //Below condition means that find all the posts whose postedby has current user's followings(id's of the users which current user follows)
    Post.find({postedBy:{$in: req.user.following}})                                                 //Cause we want all the posts
        .populate('postedBy',"_id name pic")                        //So that we'll get _id and name of the user rather than just the objectId. The first para tells which component and second tell the part to be displayed
        .populate('comments.postedBy','_id name')
        .then(posts => {
            res.json({posts})
        })
        .catch(err => {
            console.log(err);
        })
})
//Posting the post
postRouter.post('/createpost', requireLogin, (req, res) => {    //Only registered users can post
    const { title, pic} = req.body;
    if(!title || !pic){                                        //If title or body isnt present, then we'll throw error
        return res.status(422).json({error: "Please enter all the fields"});
    }
    
    req.user.password = undefined;                              //This wont allow to store user's pasword in the postedBt field of the post schema
    const post = new Post({
        title,
        photo: pic,
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


//Fetching all the posts created by the particular user who's logged in 
postRouter.get('/myposts', requireLogin, (req, res) => {
    Post.find({postedBy: req.user._id})
    .populate("comments.postedBy", "_id name")              //We'll populate the postedBy, cause we need the name of the user who posted it 
    .populate("postedBy", "_id name") 
    .then(mypost => {
        res.json({mypost});
    })
    .catch(err => {
        console.log(err);
    } )
})


//Route for like
postRouter.put('/like', requireLogin, (req, res) => {           //We'll use put method for updating the like status of that particular post
    Post.findByIdAndUpdate(req.body.postId,{                    //So, whenever user clicks on like, we'll find the post by id and push the user id in likes part of the post schema
        $push:{likes: req.user._id}
    },{
        new: true                                               //We add this third parameter, because if we dont add new=true, mongodb will return us the old record rather than the updated record
    }) 
    .populate("comments.postedBy", "_id name")              //We'll populate the postedBy, cause we need the name of the user who posted it 
    .populate("postedBy", "_id name")                
    .exec((err, result) => {                                 //Then we'll execute it and return the results
        if(err){
            return res.status(422).json({error: err})
        }
        else{
            res.json(result)
        }
    })
})

//Route for unlike  
postRouter.put('/unlike', requireLogin, (req, res) => {            //Else, everything will be same
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes: req.user._id}                                 //Here for unlike we'll just pull the userid from the like part of the post schema
    },{
        new:true
    })
    .populate("comments.postedBy", "_id name")              //We'll populate the postedBy, cause we need the name of the user who posted it 
    .populate("postedBy", "_id name")
    .exec((err, result) => {
        if(err){
            return res.status(422).json({error: err})
        }
        else{
            res.json(result)
        }
    })
})

//Route to add comment
postRouter.put('/addcomment', requireLogin, (req, res) => {   
    const comment = {
        text: req.body.text,
        postedBy: req.user._id                  //Retrieving the user data from requireLogin  middleware
    }         
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}                                
    },{
        new:true
    })
    .populate("comments.postedBy", "_id name")              //We'll populate the postedBy, cause we need the name of the user who posted it 
    .populate("postedBy", "_id name")
    .exec((err, result) => {
        if(err){
            return res.status(422).json({error: err})
        }
        else{
            res.json(result)
        }
    })
})


//Route to delete post
postRouter.delete('/deletepost/:postId', requireLogin, (req, res) => {
    Post.findOne({_id:req.params.postId})                   //We can access the postId which we got from url from frontend, by params
        .exec((err, post) => {
            if(err || !post){                                   //We'll check if there is an error or wheather the post is not present 
                return res.status(422).json({error: err})
            }
            else{
                post.remove()
                .then(result => {
                    res.json(result)
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        })
})
module.exports = postRouter;