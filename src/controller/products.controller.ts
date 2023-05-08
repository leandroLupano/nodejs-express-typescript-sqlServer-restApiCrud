import createDebug from 'debug';
import { NextFunction, Request, Response } from 'express';
import sql from 'mssql';
import { queries } from '../database/database.queries.js';

const debug = createDebug('SERVER:controller');

export class ProductsController {
  constructor() {
    debug('controller-initiated');
  }

  async getAllProducts(req: Request, res: Response, next: NextFunction) {
    try {
      debug('Get All Products method');

      const pool: sql.ConnectionPool = req.body.db;
      const result = await pool.request().query(queries.getAllProducts);

      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send((error as Error).message);
      next(error);
    }
  }
}
