export const {
  PORT = 4000,
  NODE_ENV = 'development',
  SECRET = 'supersecret',
  DB_URI = 'mongodb://localhost/crossword-web',
  PUZZLE_DB_NAME = 'historicalCrossword',
  APP_URL = 'http://localhost:3000',
} = process.env;

export const IN_PROD = NODE_ENV === 'production';
