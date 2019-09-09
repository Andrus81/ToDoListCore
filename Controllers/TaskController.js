'use strict'

let taskModel = require('../Models/Task');
let constants = require('../Utils/Constants');
const url = require('url');
const querystring = require('querystring');

var TaskController = {

    // The Get method Returns the Tasks created by a user,
    // but by passing the parameter 'count' we can specify how many Tasks we want
    Get : (req,res)=>{
        //Get paramas by queryString
        let parameters = querystring.parse(url.parse(req.url).query);

        let where = {}
        if(parameters.userid && parameters.stateid){
            where= { userid:parameters.userid,stateid:parameters.stateid }
        }else if(parameters.userid){
            where= { userid:parameters.userid }
        }else if (parameters.stateid){
            where= { stateid:parameters.stateid }
        }
        
        let count = parseInt(req.query.count);
        if(!(typeof count == 'number' && count>=0)){ count =20; }

        taskModel.find(where).sort({name:1}).limit(count)
        .then(data=>{
            res.send(constants.responseFormat(200,"Task",data));
        }).catch(err=>{
            res.status(400).send(constants.responseFormat(404,"Task",[err.message])); 
        });
    },

    //The Post method allows us to store a Task in our database
    Post : (req,res)=>{
        
        let task = new taskModel({
            name:req.body.name,
            description:req.body.description,
            userid:req.body.userid,
            stateid: req.body.stateid
        });
        
        task.save((err) =>{
            if(err){
                res.status(400).send(constants.validErrorGenerate("Task", 'name', err));
            }else{
                res.send(constants.responseFormat(200,"Task",[constants.saveSuccess("Task")])); 
            }            
        });
        
    },
    //The Put method allows us to update a Task in our database
    Put : (req,res)=>{
        let idTask =req.params.id;
        
       taskModel.findByIdAndUpdate(idTask,{$set:req.body},(err)=>{
            if(err){
                res.status(400).send(constants.validErrorGenerate("Task", 'name', err));
            }else{
                res.send(constants.responseFormat(200,"Task",constants.updateSuccess("Task")));
            }
            
        });
    },
    //The TaskAssignState method allows us to assign a status to a Tasks by name
    TaskAssignState : (req,res)=>{
       taskModel.findOneAndUpdate({name:req.params.name,},{$set:req.body},(err)=>{
            if(err){
                res.status(400).send(constants.validErrorGenerate("Task", 'name', err));
            }else{
                res.send(constants.responseFormat(200,"Task",constants.updateSuccess("Task")));
            }
            
        });
    },
    //The Put method allows us to remove a Task in our database
    Delete : (req,res)=>{
        let idTask = req.params.id;
        taskModel.findByIdAndDelete(idTask,(err)=>{
            if(err){
                res.status(400).send(constants.responseFormat(400,"Task",[err.message])); 
            }else{
                res.send(constants.responseFormat(200,"Task",constants.removeSuccess("Task")));
            }
            
        }); 
    },
    //The CountTaskByUser method allows us to know the amount of tasks that a user has
    CountTaskByUser: (req,res) =>{
        let userId =req.params.id;
          taskModel.countDocuments({userid:userId},(err,count) =>{
             if(err){
                 res.status(400).send(constants.responseFormat(400,"Task",[err.message]));
             }else{
                res.send(constants.responseFormat(200,"Task",[count]));
             }
         })
    }
};
module.exports = TaskController;