// let expect = require('expect')
// let request = require('supertest')
let server = require('../app');
//let should = chai.should();

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);


//chai.use(chaiHttp);
let baseUrl = "localhost:3000";


describe("testing the tests", function(){
    //console.log(baseUrl);
    //let text = "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes.";
    it("testing the home page", function(){
        chai.request(server)
            .get("/")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                
                res.body.length.should.be.eql(0);
              done();
              //console.log(res.body);
            });
    });
    
}); 