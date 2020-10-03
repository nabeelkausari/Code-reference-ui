'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = () => {
  _mongoose2.default.Promise = global.Promise;
  _mongoose2.default.set('debug', process.env.NODE_ENV !== 'production');
  const mongoUrl = getMongoUrl();

  try {
    _mongoose2.default.connect(mongoUrl);
  } catch (err) {
    _mongoose2.default.createConnection(mongoUrl);
  }

  _mongoose2.default.connection.once('open', () => console.log('MongoDB Running')).on('error', e => {
    throw e;
  });
};

const getMongoUrl = () => {
  let authStr = '';
  let { mongoUser, mongoPass, mongoHost, mongoPort, mongoDb } = process.env;

  if (mongoUser) {
    authStr = encodeURIComponent(mongoUser);
    if (mongoPass) authStr += ':' + encodeURIComponent(mongoPass);
    authStr += '@';
  }

  return 'mongodb://' + authStr + mongoHost + ':' + mongoPort + '/' + mongoDb;
};