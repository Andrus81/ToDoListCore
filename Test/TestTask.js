'use strict'
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app.js');
let ControllerTask = require('../Controllers/TaskController');

chai.should();
chai.use(chaiHttp);

before(done => {
    console.log('\n\n-----------------------\n--\n-- START TEST\n--\n-------------------------');
    done();
});

after(done => {
    console.log('\n\n-----------------------\n--\n-- END TEST\n--\n-------------------------');
    done();
});

describe("Unit Test for API Tasks",()=>{

    describe("Tests Task@Get",()=>{
        it("Check StatusCode 200OK from Get",done=>{
            chai.request(server)
            .get('/Task')
            .end((err, res)=> {
                if (err) done(err);
                if(200 == res.body.statusCode){
                    //console.log(`Response Api StatusCode: ${res.body.statusCode}`);
                    done();
                }
            });
        });
        it("Check Task userid undefined GET",done=>{
            chai.request(server)
            .get('/Task?userid=')
            .end((err,res)=>{
                if (err) done(err);
                if(res.body.Data.length > 0){
                    //console.log(`Count Task ${res.body.Data.length}`);
                    done();
               }
            });

        });
    });

});