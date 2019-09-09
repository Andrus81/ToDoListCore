'use strict'

//Components
var express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
var mongoDB = require("./Database/MongoConnection");
var ApiRoutes = require("./Routes/Api");

//Instances
var app = express();
var port = 3020;

//middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());
app.use('/',ApiRoutes); //Load Routes
 

//Listen Server
app.listen(port,()=>{
    console.log(`Server is Running on Port: ${port}`);
});


module.exports = app;