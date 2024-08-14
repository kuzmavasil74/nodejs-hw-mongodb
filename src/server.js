import express from 'express'; //  імпорт
import cors from 'cors';
import pino from 'pino';
import pinoHttp from 'pino-http';

const PORT = process.env.PORT || 3000; // порт, який буде використовуватися для запуску сервера (за замовчуванням 3000)
export const startServer = () => {
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
  app.listen(PORT, () => {
    // запускаємо сервер на вказаному порту
    console.log(`Server is running on port ${PORT}`); // виводимо повідомлення про запуск сервера
  });
  return app; // повертаємо налаштування сервера
};
