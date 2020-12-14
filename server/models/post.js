//This schema is for posting image
const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    likes: [{                       //Here, we'll make another schema object for likes of each post, which will be an array of userId's whoever liked the particular post
        type: ObjectId,
        ref: "User"
    }],
    comments: [{
        text: String,
        postedBy: {type: ObjectId, ref: "User"}
    }],
    postedBy: {
        type: ObjectId,                                 //This will be the id of the user from the User schema
        ref: "User"
    }
})


mongoose.model("Post", postSchema);