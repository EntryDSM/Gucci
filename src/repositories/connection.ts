import { MongoClient } from 'mongodb';
import { MONGODB_URI, MONGODB_NAME } from '../config';

export const connectDb = async () => {
  const client = await MongoClient.connect(MONGODB_URI, {
    useNewUrlParser: true,
  });
  return client.db(MONGODB_NAME);
};
