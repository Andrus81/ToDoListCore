'use strict'

let constants = require('../Utils/Constants');

var homeController = {
    //The Get method allows us to check if the api is working
    Get : (req,res)=> res.send(constants.responseFormat(200,"Api is running",{}))    
}

module.exports = homeController;