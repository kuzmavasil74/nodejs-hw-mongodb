import { setupServer } from './server.js'; // імпортуємо функцію для налаштування сервера

const PORT = process.env.PORT || 3000; // порт, який буде використовуватися для запуску сервера (за замовчуванням 3000)
const app = setupServer(); // імпортуємо функцію для налаштування сервера

app.listen(PORT, () => {
  // запускаємо сервер на вказаному порту
  console.log(`Server is running on port ${PORT}`); // виводимо повідомлення про запуск сервера
});
