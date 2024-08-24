import path from 'path';

// константи
// порт сервера
export const ENV_VARS = {
  PORT: 'PORT',
  JWT_SECRET: 'JWT_SECRET',
  FRONTEND_HOST: 'FRONTEND_HOST',
  BACKEND_HOST: 'BACKEND_HOST',
  IS_CLOUDINARY_ENABLED: 'IS_CLOUDINARY_ENABLED',
};
// порт бази даних
export const MONGO_VARS = {
  MONGODB_USER: 'MONGODB_USER',
  MONGODB_PASSWORD: 'MONGODB_PASSWORD',
  MONGODB_URL: 'MONGODB_URL',
  MONGODB_DB: 'MONGODB_DB',
};
// порядок сортування
export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};
// змінні пошти
export const EMAIL_VARS = {
  SMTP_HOST: 'SMTP_HOST',
  SMTP_PORT: 'SMTP_PORT',
  SMTP_USER: 'SMTP_USER',
  SMTP_PASS: 'SMTP_PASS',
  SMTP_FROM: 'SMTP_FROM',
};
// константи для шаблонів
export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');
export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');
export const UPLOAD_DIR = path.join(process.cwd(), 'upload');
// константи для cloudinary
export const CLOUDINARY = {
  CLOUD_NAME: 'CLOUDINARY_CLOUD_NAME',
  API_KEY: 'CLOUDINARY_API_KEY',
  API_SECRET: 'CLOUDINARY_API_SECRET',
};

export const GOOGLE = {
  CLIENT_ID: 'GOOGLE_CLIENT_ID',
  CLIENT_SECRET: 'GOOGLE_CLIENT_SECRET',
};

export const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');
