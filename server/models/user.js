const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;               // We use this so that we can take the data from another model

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    followers:[{                                        //So that if a user clicks the follow button, the id of this user will be stored in this part of the schema
        type: ObjectId,
        ref: "User"
    }],
    following:[{                                       //And if a user follows anyone, their id will be stored in this
        type: ObjectId,
        ref: "User"
    }],
    pic:{
        type: String,
        default: "https://res.cloudinary.com/arpitig-clone/image/upload/v1609091132/Unknown_c1uea6.jpg"
    }
})

mongoose.model("User", userSchema);                 //We'll not export it as a module, cause we have to use it in many places so we'll just export it