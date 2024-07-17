import express from 'express'; //  імпорт
import cors from 'cors';
import pino from 'pino';
import pinoHttp from 'pino-http';

export const setupServer = () => {
  // функція для налаштування сервера
  const app = express();

  // Налаштування CORS
  app.use(cors()); // додаємо middleware CORS

  // Налаштування логера pino
  const logger = pino(); // створюємо логгер
  app.use(pinoHttp({ logger })); // додаємо логгер до middleware

  // Обробка неіснуючих роутів
  app.use((req, res, next) => {
    // обробка неіснуючих роутів
    res.status(404).send({ message: 'Not found' }); // відповідь зі статусом 404
  });

  return app; // повертаємо налаштування сервера
};
