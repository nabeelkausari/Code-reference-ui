import mongoose from 'mongoose';

const getMongoUrl = () => {
  let authStr = '';
  const {
    mongoUser, mongoPass, mongoHost, mongoPort, mongoDb
  } = process.env;

  if (mongoUser) {
    authStr = encodeURIComponent(mongoUser);
    if (mongoPass) authStr += `:${encodeURIComponent(mongoPass)}`;
    authStr += '@';
  }

  return `mongodb://${authStr}${mongoHost}:${mongoPort}/${mongoDb}`;
};

export default () => {
  mongoose.Promise = global.Promise;
  mongoose.set('debug', process.env.NODE_ENV !== 'production');
  const mongoUrl = getMongoUrl();

  try {
    mongoose.connect(mongoUrl);
  } catch (err) {
    mongoose.createConnection(mongoUrl);
  }

  mongoose.connection
    .once('open', () => console.log('MongoDB Running'))
    .on('error', e => {
      throw e;
    });
};
