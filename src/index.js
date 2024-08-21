import { initMongoDB } from './db/initMongoConnection.js';
import { startServer } from './server.js';
import { createFolderIfNotExist } from './utils/createFolderIfNotExist.js';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/index.js';
const bootstrap = async () => {
  await initMongoDB();
  await createFolderIfNotExist(TEMP_UPLOAD_DIR);
  await createFolderIfNotExist(UPLOAD_DIR);
  startServer();
};

bootstrap();
