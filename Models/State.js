'use strict'

var mongoose = require("mongoose");
const Constants = require('../Utils/Constants');

var status = mongoose.Schema({
    name: {
        type: String , require:[true,Constants.validFieldRequired('Name')],
        index: {unique:true},
        minlength:[2,Constants.validFieldLengthMin('Name',2)] , maxlength:[15,Constants.validFieldLengthMax('Name',15)]
       },
   description: {type: String , maxlength:[100,Constants.validFieldLengthMax('Description',100)]},
   userid:{type: String , require:[true,Constants.validFieldRequired('User')]},
   createDate:{ type:Date, default:Date.now }
});

module.exports = mongoose.model('Status',status);