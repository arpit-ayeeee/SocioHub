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
    postedBy: {
        type: ObjectId,                                 //This will be the id of the user from the User schema
        ref: "User"
    }
})


mongoose.model("Post", postSchema);