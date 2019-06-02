import { MongoClient } from 'mongodb';
import { mongodbUri, mongodbName } from '../config';

export const connectDb = async () => {
  const client = await MongoClient.connect(mongodbUri, {
    useNewUrlParser: true,
  });
  return client.db(mongodbName);
};
