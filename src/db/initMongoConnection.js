import mongoose from 'mongoose';

import { env } from '../utils/env.js';
import { MONGO_VARS } from '../constants/index.js';
// Функція для ініціалізації бази даних
export const initMongoDb = async () => {
  try {
    const user = env(MONGO_VARS.MONGODB_USER);
    const pwd = env(MONGO_VARS.MONGODB_PASSWORD);
    const url = env(MONGO_VARS.MONGODB_URL);
    const db = env(MONGO_VARS.MONGODB_DB, '');
    await mongoose.connect(
      `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`,
    );

    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.log('Error while connecting to mongo', error);
    process.exit(1);
  }
};
