import express from 'express';
import { createServer } from 'http';
import env from 'node-env-file';
import path from 'path';
import socketIO from 'socket.io';

const prod = process.env.NODE_ENV === "production"
const test = process.env.NODE_ENV === "test"
const staging = process.env.NODE_ENV === "staging"
if (prod) {
  env('./conf.ini');
  env('./.keys')
} else if (staging) {
  env('./conf.staging.ini')
  env('./.keys')
} else if (test) {
  env('./conf.test.ini')
} else {
  env('./conf.dev.ini');
}

const port = parseInt(process.env.PORT, 10) || 5000

import setupApis from './api/api';
import setupDb from './config/db';
import setupMiddlewares from './config/middlewares';
import setupPassport from './config/passport';
// import './services/mocks'
// import './mails/test';
// import setupCounters from './config/counters';
// setupCounters().then(() => console.log('counters checked'))



const app = express();
const server = createServer(app)
const io = socketIO(server)

setupDb();
// testDeploy();

setupPassport(app);
setupMiddlewares(app);
setupApis(app, io);

// app.use(express.static(path.join(__dirname + '/../client/build')));
//
// app.get('*', function(req, res) {
//   res.sendFile(path.join(__dirname + '/../client/build/index.html'));
// });

server.listen(port, err => {
  if (err) return console.log(err);
  console.log(`server listening on port ${port}`)
})

export default server // for testing
