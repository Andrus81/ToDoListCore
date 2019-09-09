'use strict'

const mongoose = require('mongoose');
const stringConnection = 'mongodb+srv://Leyner:Leyner10@cluster0-gndvw.mongodb.net/todolist';

mongoose.connect(stringConnection,{
    useNewUrlParser : true,
    useCreateIndex: true,
    useFindAndModify:false}
);

module.exports = mongoose;