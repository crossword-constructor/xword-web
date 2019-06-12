export const {
  APP_PORT = 4000,
  NODE_ENV = 'development',

  DB_USERNAME = 'admin',
  DB_PASSWORD = 'secret',
  DB_HOST = 'localhost',
  DB_PORT = 27017,
  DB_NAME = 'chat',

  SESS_SECRET = 'secret',
  SESS_NAME = 'u',
} = process.env;

export const IN_PROD = NODE_ENV === 'production';
