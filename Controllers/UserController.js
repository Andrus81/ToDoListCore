'use strict'

var userModel = require('../Models/User');
let constants = require('../Utils/Constants');
const url = require('url');
const querystring = require('querystring');

var UserController = {
    // The Get method returns the users created in the system
    // but by passing the parameter 'count' we can specify how many Tasks we want
    Get: (req, res) => {    
        //Get paramas by queryString
        let parameters = querystring.parse(url.parse(req.url).query);
        let where = {}
        if(parameters.userid){
            where= { _id:parameters.userid }
        }
        let count = 20  
        if(parameters.count){
            count = !(typeof parameters.count == 'number' && count >= 0) ?  count = parseInt(parameters.count) : count;
        }
        
        userModel.find(where).sort({username:1}).limit(count)
            .then(data=>{
                res.send(constants.responseFormat(200,"User",data));
            })
            .catch(err =>{
                res.StateCode=404;
                res.send(constants.responseFormat(404,"State",[err.message])); 
            })
    },
    //The Post method allows us to store a User in our database
    Post: (req, res) => {
        let user = new userModel({
            username: req.body.username,
            createDate: req.body.createDate
        });
        user.save(err => {
            if (err) {
                res.status(400).send(constants.validErrorGenerate("User", 'Username', err));
            } else {
                res.send(constants.responseFormat(200, "User", [constants.saveSuccess("User")]));
            }
        })
    },
    //The Put method allows us to update a User in our database
    Put: (req, res) => {
        let id = req.params.id;
        let body = req.body
        userModel.findByIdAndUpdate(id, { $set: body }, (err) => {
            if (err) {
                res.status(400).send(constants.validErrorGenerate("User", 'UserDelete', err));
            }else{
                res.send(constants.updateSuccess("User"));
            }
            
        })
    },
    //The Put method allows us to remove a Task in our database
    Delete: (req, res) => {
        userModel.findByIdAndDelete(req.params.id, err => {
            if (err) {
                res.status(400).send(constants.validErrorGenerate("User", 'UserDelete', err));
            }else{
                res.send(constants.removeSuccess("User"));
            }            
        })
    },
    //The Login method allows us to return the UserID of a registered user,
    //if the username we receive does not exist,
    // we register it and return its userID
    Login: (req, res) => {
        let _username = req.body.username;
        userModel.findOne({ username: _username })
            .then(data => {
                res.send(constants.responseFormat(200, "User", [data._id]));
            })
            .catch(err => {
                let user = new userModel({
                    username: _username,
                    createDate: req.body.createDate
                });
                user.save(error => {
                    if (error) {
                        res.status(400).send(constants.validErrorGenerate("User", 'Username', error));
                    } else {
                        res.send(constants.responseFormat(200, "User", [user._id]));
                    }
                });
            });
    }
};

module.exports = UserController;