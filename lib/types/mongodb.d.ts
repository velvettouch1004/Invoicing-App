import { MongoClient } from 'mongodb';

declare global {
  // eslint-disable-next-line
  var _mongoClientPromise: Promise<MongoClient>;
}
