'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _nodeEnvFile = require('node-env-file');

var _nodeEnvFile2 = _interopRequireDefault(_nodeEnvFile);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _api = require('./api/api');

var _api2 = _interopRequireDefault(_api);

var _db = require('./config/db');

var _db2 = _interopRequireDefault(_db);

var _middlewares = require('./config/middlewares');

var _middlewares2 = _interopRequireDefault(_middlewares);

var _passport = require('./config/passport');

var _passport2 = _interopRequireDefault(_passport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import './services/mocks'
// import './mails/test';
// import setupCounters from './config/counters';
// setupCounters().then(() => console.log('counters checked'))

const prod = process.env.NODE_ENV === "production";
const test = process.env.NODE_ENV === "test";
if (prod) {
  (0, _nodeEnvFile2.default)('./conf.ini');
} else if (test) {
  (0, _nodeEnvFile2.default)('./conf.test.ini');
} else {
  (0, _nodeEnvFile2.default)('./conf.dev.ini');
}
if ('./.keys') (0, _nodeEnvFile2.default)('./.keys');

const port = parseInt(process.env.PORT, 10) || 5000;

const app = (0, _express2.default)();
const server = (0, _http.createServer)(app);
const io = (0, _socket2.default)(server);

(0, _db2.default)();
// testDeploy();

(0, _passport2.default)(app);
(0, _middlewares2.default)(app);
(0, _api2.default)(app, io);

// app.use(express.static(path.join(__dirname + '/../client/build')));
//
// app.get('*', function(req, res) {
//   res.sendFile(path.join(__dirname + '/../client/build/index.html'));
// });

server.listen(port, err => {
  if (err) return console.log(err);
  console.log(`server listening on port ${port}`);
});

exports.default = server; // for testing