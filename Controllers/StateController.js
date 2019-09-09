'use strict'

let stateModel = require('../Models/State');
let constants = require('../Utils/Constants');
const url = require('url');
const querystring = require('querystring');

var StateController = {

    // The Get method Returns the states created by a user,
    // but by passing the parameter 'count' we can specify how many states we want
    Get : (req,res)=>{
        //Get paramas by queryString
        let parameters = querystring.parse(url.parse(req.url).query);
        let where = {}
        if(parameters.userid){
            where= { userid:parameters.userid }
        }

        let count = 20  
        if(parameters.count){
            //If Count is not a number, we will return a maximum of 20 records
            count = !(typeof parameters.count == 'number' && count >= 0) ?  count = parseInt(parameters.count) : count;
        }

        stateModel.find(where).sort({name:1}).limit(count)
        .then(data=>{
            res.send(constants.responseFormat(200,"State",data));
        }).catch(err=>{
            res.status(400).send(constants.responseFormat(400,"State",[err.message])); 
        });
    },

    GetGroup : (req,res)=>{
        //Get paramas by queryString
        let parameters = querystring.parse(url.parse(req.url).query);
       
        let count = 50  
        if(parameters.count){
            //If Count is not a number, we will return a maximum of 50 records
            count = !(typeof parameters.count == 'number' && count >= 0) ?  count = parseInt(parameters.count) : count;
        }

        stateModel.find({userid:undefined}).limit(count)
        .then(data=>{
            res.send(constants.responseFormat(200,"State",data));
        }).catch(err=>{
            res.status(400).send(constants.responseFormat(400,"State",[err.message])); 
        });
    },

    //The Post method allows us to store a state in our database
    Post : (req,res)=>{
        
        let State = new stateModel({
            name:req.body.name,
            description:req.body.description,
            userid:req.body.userid                
        });
            
        State.save((err) =>{
            if(err){
                res.status(400).send(constants.validErrorGenerate("State", 'name', err));
            }else{
                res.send(constants.responseFormat(200,"State",[constants.saveSuccess("State")])); 
            }            
        });
        
    },
    //The Put method allows us to update a state in our database
    Put : (req,res)=>{
       let id = req.params.id;     
       
       stateModel.findByIdAndUpdate(id,{$set: req.body},(err)=>{
        if (err) {
            res.status(400).send(constants.validErrorGenerate("State", 'Name', err.message));
        }else{
            res.send(constants.updateSuccess("State"));
        }
        
       })
    },
    //The Put method allows us to remove a state in our database
    Delete : (req,res)=>{
        stateModel.findByIdAndDelete(req.params.id, err => {
            if (err) {
                res.status(400).send(constants.validErrorGenerate("State", 'StateDelete', err));
            }else{
                res.send(constants.removeSuccess("State"));
            }            
        })
    },


};
module.exports = StateController;