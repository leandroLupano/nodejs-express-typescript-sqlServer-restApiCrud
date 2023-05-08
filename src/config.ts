import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 5100,
  dbUser: process.env.DB_USER || '',
  dbPassword: process.env.DB_PASSWORD || '',
  dbServer: process.env.DB_SERVER || '',
  dbDatabase: process.env.DB_DATABASE || '',
};
