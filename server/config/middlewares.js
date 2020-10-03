import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

import { decodeToken } from '../services/auth';

async function auth(req, res, next) {
  try {
    const token = req.headers.authorization;
    if (token !== null) {
      req.user = await decodeToken(token);
    } else {
      req.user = null;
    }
    return next()
  } catch (err) {
    throw err;
  }
}

export default app => {
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json({limit: '5mb'}));
  if (process.env.NODE_ENV !== "test") {
    app.use(morgan('combined'))
  }
  // app.use(auth);
}
