import { startServer } from './server.js'; // Імпортуємо функцію для налаштування сервера
import { initMongoDb } from './db/initMongoConnection.js'; // Імпортуємо функцію для встановлення зʼєднання з MongoDB
import dotenv from 'dotenv';

dotenv.config();
// Функція для ініціалізації бази даних
const bootstrap = async () => {
  try {
    await initMongoDb();
    startServer(); // Запускаємо сервер після успішного з'єднання з MongoDB
  } catch (error) {
    console.error('Error during bootstrap:', error);
  }
};

bootstrap();
