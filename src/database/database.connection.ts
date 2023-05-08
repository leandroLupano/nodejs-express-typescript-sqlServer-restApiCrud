import sql from 'mssql';
import { config } from '../config.js';
import { NextFunction, Request, Response } from 'express';

const dbSettings = {
  user: config.dbUser,
  password: config.dbPassword,
  server: config.dbServer,
  database: config.dbDatabase,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

export const dbConnection = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const pool = await sql.connect(dbSettings);
    req.body.db = pool;
    next();
  } catch (error) {
    console.error(error);
  }
};
