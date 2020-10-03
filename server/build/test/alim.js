'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _Alim = require('../models/Alim');

var _Alim2 = _interopRequireDefault(_Alim);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

process.env.NODE_ENV = 'test';

//Require the dev-dependencies

// import server from '../index';
let should = _chai2.default.should();

_chai2.default.use(_chaiHttp2.default);
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
    it('it should GET all ulama', done => {
      _chai2.default.request('http://localhost:5000').get('/api/alim').end((err, res) => {
        // console.log('alim err: ', err)
        console.log('alim res: ', res);
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(0);
        done();
      });
    });
  });
});