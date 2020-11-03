const mongoose = require('mongoose');

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
    }
})

mongoose.model("User", userSchema);                 //We'll not export it as a module, cause we have to use it in many places so we'll just export it