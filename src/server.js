import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { env } from './utils/env.js';
import { ENV_VARS } from './constants/index.js';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import notFoundMiddleware from './middleware/notFoundMiddleware.js';
import rootRouter from './routers/index.js';
// запуск сервера
const PORT = env(ENV_VARS.PORT, 3000);
console.log('PORT', PORT);
// функція для запуску сервера
export const startServer = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  // маршрутизація
  app.use(rootRouter);
  // мідлвари відповіді за допомогою json з помилками
  app.use(notFoundMiddleware);
  // мідлвари відповіді за допомогою json з помилками
  app.use(errorHandlerMiddleware);
  // запуск сервера
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
