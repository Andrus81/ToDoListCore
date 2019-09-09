# ToDoListCore API

_Developed in NodeJs with the framework Express,
All data  is stored in a NoSql database (MongoDB)_

## Configuration and Deployment 🚀

_
1.	Clone the project
2.	Download all  dependencies using  the command npm install
3.	execute the Project using the command node index.js  ori f you downloades nodemon, you can use the npm start command
4.	This server run  on port 3020, you can change the port in the app.js file_

Mira **Deployment** para conocer como desplegar el proyecto.


### Test
_Call the root path and the server must respond with the following json_

```
{
    "statusCode": 200,
    "Description": "Api is running",
    "Data": {}
}

```

### Controller 🔧

_We have 4 Controllers, 3 of the business logic and 1 for the server connection test_

_1.	HomeController_

```
Get (/) - Test Api
```

_2.	TaskController_

```
-Get (/Task) - Route get: List tasks from db
-Post (/Task) - Route post: Add new task to db
-Delete (/Task) - Route delete: remove task from db
-Put (/Task) - Route put: Update task fromdb
-Put (/Task /TaskAssignState/:name) - Route put: Update task fromdb
-Put (/Task /User/:id) - //Route get: Number of tasks a user has

```


_3.	UserController_

```
-Get (/User) - Route get: List users from db    
-Post (/User) - Route post: Add new user to dbv    
-Delete (/User/:id) - Route delete: remove user from db    
-Put (/User/:id) - Route put: Update user fromdb
-Post (/User/Login) - Route path: Update user fromdb


```


_4.  StateController_

```
-Get(/State) - Route get: List of states  from db  
-Get(/State/Group) - Route get: List of states Group from db
-Post(/State) - Route post: Add new state to db    
-Delete(/State/:idRoute) -  delete: remove state from db    
-Put(/State/:idRoute) -  put: Update state from db


```


## Built with 🛠️

_Menciona las herramientas que utilizaste para crear tu proyecto_

* [NodeJs](https://nodejs.org/es/) 
* [Exressjs](http://expressjs.com/) 
* [Body-Parser](https://www.npmjs.com/package/body-parser)
* [Mongoose](https://mongoosejs.com/)
* [Cors](https://www.npmjs.com/package/cors)


---
⌨️ (https://github.com/LeynerCordoba) 🤓