import mongoose from 'mongoose';
import { databaseConfig, isDevelopment } from './config';

export default function connectDatabase() {
  return new Promise((resolve, reject) => {
    mongoose.Promise = global.Promise;
    mongoose.set('debug', isDevelopment);
    mongoose.connection
      .on('error', error => reject(error))
      .on('close', () => console.log('Database connection closed.'))
      .once('open', () => resolve(mongoose.connections[0]));

    mongoose.connect(databaseConfig, { useMongoClient: true });
  });
}
