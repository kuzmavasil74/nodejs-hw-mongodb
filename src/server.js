import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import {
  notFoundMiddleware,
  errorHandlerMiddleware,
} from './middleware/index.js';
import { ENV_VARS, UPLOAD_DIR } from './constants/index.js';
import rootRouter from './routers/index.js';
import cookieParser from 'cookie-parser';

const PORT = Number(env(ENV_VARS.PORT, '3000'));

export const startServer = () => {
  console.log('Starting server...');
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(rootRouter);

  app.use(notFoundMiddleware);

  app.use(errorHandlerMiddleware);

  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
};
