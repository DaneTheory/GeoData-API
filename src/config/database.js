/* eslint-disable no-console */

/**
 * Configuration for the database
 */

import mongoose from 'mongoose';

import Constants from './Constants';

mongoose.Promise = global.Promise;

mongoose.set('debug', process.env.MONGOOSE_DEBUG);
try {
  mongoose.connect(Constants.MONGO_URL, {
    useMongoClient: true,
  });
} catch (error) {
  mongoose.createConnection(Constants.MONGO_URL, {
    useMongoClient: true,
  });
}

mongoose.connection
  .once('open', () => console.log('MongoDB Running'))
  .on('error', e => {
    throw e;
  });
