import dotenv from 'dotenv';

dotenv.config();
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
