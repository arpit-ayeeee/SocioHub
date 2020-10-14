//MongoPasskey: elaThD4UiCluJyzL
const express = require('express')
const app = express()
const mongoose = require('mongoose');
const PORT = 5000
const {MONGOURI} = require('./keys');

require('./models/users');                                  //Gettin schema
app.use(express.json());                                    //Body parser


app.use(require('./routes/auth'));                          //Gettin routes


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

app.listen(PORT, () => {
    console.log("Server running successfully on ", PORT);
})