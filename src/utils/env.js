import dotenv from 'dotenv';
// Імпортуємо модуль dotenv
dotenv.config();
// Функція для отримання значення з ENV файлу
export const env = (envName, defaultValue) => {
  const value = process.env[`${envName}`];
  if (value) {
    return value;
  } else if (defaultValue) {
    return defaultValue;
  } else {
    throw new Error(`Environment variable ${envName} is not defined`);
  }
};
