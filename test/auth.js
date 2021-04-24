process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');

let chai = require('chai');
let chaiHttp = require('chai-http'); 
let should = chai.should();
let expect = chai.expect();
const host = 'http://localhost:3001';

chai.use(chaiHttp);

describe('user login', () => {
  it('it should login a user by responding with user and token', (done) => {
    const user = {
      username: 'olu@maintai.com',
      password: 'password',
    };
    
    chai
      .request(host)
      .post('/auth/login/')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200); 
        res.body.should.be.a('object');
        res.body.should.have.property('user');
        res.body.should.have.property('token');
        done();
      });
  });
});
describe('user login - without correct input', () => {
  it('it should return error 500', (done) => {
    const user = {
      username: 'olu@maintai.com'
    };
    
    chai
      .request(host)
      .post('/auth/login/')
      .send(user)
      .end((err, res) => {
        res.should.have.status(500); 
        done();
      });
  });
});
describe('user  sign up', () => {
  it('it should create new user account', (done) => {
    const user = {
      "username": "oluaxasss@maintai.com",
      "password": "password",
      "email": "olaaaxsss@gmail.com",
      "name": "femi"
    }
    
    chai
      .request(host)
      .post('/auth/login/')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('user');
        res.body.should.have.property('token'); 
        done();
      });
  });
});
describe('user sign up - without correct input', () => {
  it('it should return error 500', (done) => {
    const user = {
      username: 'olu@maintai.com'
    };
    
    chai
      .request(host)
      .post('/auth/signup/')
      .send(user)
      .end((err, res) => {
        res.should.have.status(500); 
        done();
      });
  });
});
