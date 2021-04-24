process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../src/server');
let should = chai.should();


chai.use(chaiHttp);

describe('Contacts', () => {
  describe('/GET Contact', () => {
      it('it should GET all the contacts', (done) => {
        chai.request(server)
            .get('/contact/all')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
              done();
            });
      });
  });
  /*
  * Test the /POST route
  */
  describe('/POST Contact', () => {
      it('it should not POST a Contact without pages field', (done) => {
          let Contact = {
              title: "The Lord of the Rings",
              author: "J.R.R. Tolkien",
              year: 1954
          }
        chai.request(server)
            .post('/contact')
            .send(Contact)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('errors');
                  res.body.errors.should.have.property('pages');
                  res.body.errors.pages.should.have.property('kind').eql('required');
              done();
            });
      });

  });
});