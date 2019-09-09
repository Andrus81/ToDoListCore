'use strict'

const mongoose = require('mongoose');
const Constants = require('../Utils/Constants');

var TaskSchema = mongoose.Schema({
    name: {
         type: String , require:[true,Constants.validFieldRequired('Name')],
         index: {unique:true},
         minlength:[2,Constants.validFieldLengthMin('Name',2)] , maxlength:[30,Constants.validFieldLengthMax('Name',30)]
        },
    description: {type: String , maxlength:[150,Constants.validFieldLengthMax('Description',150)]},
    userid:String,
    stateid:String,
    createDate:{ type:Date, default:Date.now }
});

module.exports = mongoose.model('Task',TaskSchema);