'use strict'

const express = require('express');
var homeController = require('../Controllers/HomeController');
var stateController = require('../Controllers/StateController');
var taskController = require('../Controllers/TaskController');
var userController = require('../Controllers/UserController');

var route = express.Router();

//Routes Home
    
route.get('',homeController.Get); //Route Home: List tasks from db


//Routes model TASK
    
route.get('/Task',taskController.Get); //Route get: List tasks from db    
route.post('/Task',taskController.Post); //Route post: Add new task to db    
route.delete('/Task/:id',taskController.Delete); //Route delete: remove task from db    
route.put('/Task/:id',taskController.Put); //Route put: Update task fromdb
route.put('/Task/TaskAssignState/:name',taskController.TaskAssignState); //Route put: Update task fromdb
route.get('/Task/User/:id', taskController.CountTaskByUser) //Route get: Number of tasks a user has



//Routes model USER

route.get('/User',userController.Get); //Route get: List users from db    
route.post('/User',userController.Post); //Route post: Add new user to dbv    
route.delete('/User/:id',userController.Delete); //Route delete: remove user from db    
route.put('/User/:id',userController.Put);//Route path: Update user fromdb
route.post('/User/Login',userController.Login);//Route path: Update user fromdb


//Routes model STATUS

route.get('/State',stateController.Get); //Route get: List of states  from db  
route.get('/State/Group',stateController.GetGroup); //Route get: List of states Group from db
route.post('/State',stateController.Post); //Route post: Add new state to db    
route.delete('/State/:id',stateController.Delete); //Route delete: remove state from db    
route.put('/State/:id',stateController.Put);//Route put: Update state from db

module.exports = route;