//MongoPasskey: elaThD4UiCluJyzL
const express = require('express')
const app = express()
const mongoose = require('mongoose');
const PORT = 5000
const {MONGOURI} = require('./keys');


//Establishing the connection with database
mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connection', () => {
    console.log("Connected to mongo");
}) 
mongoose.connection.on('error', (err) => {
    console.log("Error connecting", err);
})


//Gettin schema
require('./models/user');                                  
require('./models/post');



app.use(express.json());                                    //Body parser

//Gettin routes
app.use(require('./routes/auth')); 
app.use(require('./routes/post')); 
app.use(require('./routes/user'));                        


app.listen(PORT, () => {
    console.log("Server running successfully on ", PORT);
})