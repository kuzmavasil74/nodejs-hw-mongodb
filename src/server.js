import express from 'express';
import cors from 'cors';
import pino from 'pino';
import pinoHttp from 'pino-http';
import { env } from './env.js';
import { ENV_VARS } from './contacts/index.js';
import { getAllContacts, getContactById } from './services/contacts.js'; // Імпортуємо сервіс
import mongoose from 'mongoose';

const PORT = env(ENV_VARS.PORT, 3000); // порт, який буде використовуватися для запуску сервера (за замовчуванням 3000)
console.log('PORT', PORT);
export const startServer = () => {
  // функція для налаштування сервера
  const app = express();

  app.use(express.json()); // додаємо middleware для обробки JSON-даних

  // Налаштування CORS
  app.use(cors()); // додаємо middleware CORS

  // Налаштування логера pino
  const logger = pino(); // створюємо логгер
  app.use(pinoHttp({ logger })); // додаємо логгер до middleware

  // Роут для отримання всіх контактів
  app.get('/contacts', async (req, res) => {
    try {
      const contacts = await getAllContacts();
      res.status(200).json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
      });
    } catch (error) {
      res.status(500).json({ message: `Internal server error ${error}` });
    }
  });
  // Роут для отримання контакту за ID
  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;
    try {
      const contact = await getContactById(contactId);
      if (!contact) {
        return res.status(404).json({ message: 'Contact not found' });
      }
      res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: `Internal server error: ${error.message}` });
    }
  });

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
