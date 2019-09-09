'use strict'

const mongoose = require('mongoose');
const Constants = require('../Utils/Constants');

var UserSchema = mongoose.Schema({
    username: {
         type: String , require:[true,Constants.validFieldRequired('Username')],
         index: {unique:true},
         minlength:[1,Constants.validFieldLengthMin('Username',1)] , maxlength:[25,Constants.validFieldLengthMax('Username',25)]
    },
    createDate:{ type:Date, default:Date.now }
});

module.exports = mongoose.model('User',UserSchema);