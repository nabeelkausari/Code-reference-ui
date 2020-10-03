process.env.NODE_ENV = 'test';

import mongoose from "mongoose";
import Alim from '../models/Alim';

//Require the dev-dependencies
import chai from 'chai';
import chaiHttp from 'chai-http';
// import server from '../index';
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Books', () => {
  // beforeEach((done) => { //Before each test we empty the database
  //   Alim.remove({}, (err) => {
  //     done();
  //   });
  // });
  /*
    * Test the /GET route
    */
  describe('/GET alim', () => {
    it('it should GET all ulama', (done) => {
      chai.request('http://localhost:5000')
        .get('/api/alim')
        .end((err, res) => {
          // console.log('alim err: ', err)
          console.log('alim res: ', res)
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

});
