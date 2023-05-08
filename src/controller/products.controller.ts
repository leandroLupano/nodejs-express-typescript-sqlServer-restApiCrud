import createDebug from 'debug';
import { NextFunction, Request, Response } from 'express';
import sql from 'mssql';
import { queries } from '../database/database.queries.js';
import { HTTPError } from '../errors/errors.js';

const debug = createDebug('SERVER:controller');

export class ProductsController {
  constructor() {
    debug('controller-initiated');
  }

  async getAllProducts(req: Request, res: Response, next: NextFunction) {
    try {
      debug('Get All Products Method');

      const pool: sql.ConnectionPool = req.body.db;
      const result = await pool.request().query(queries.getAllProducts);

      res.json(result.recordset);
    } catch (error) {
      next(error);
    }
  }

  async getOneProduct(req: Request, res: Response, next: NextFunction) {
    try {
      debug('Get One Product Method');

      const pool: sql.ConnectionPool = req.body.db;
      const { id } = req.params;

      const result = await pool
        .request()
        .input('Id', id)
        .query(queries.getProductById);

      res.json(result.recordset[0]);
    } catch (error) {
      next(error);
    }
  }

  async addNewProduct(req: Request, res: Response, next: NextFunction) {
    try {
      debug('Add New Product Method');

      const { name, description, quantity } = req.body;

      if (!name || !description || !quantity)
        throw new HTTPError(
          400,
          'Bad request. Please complete all the fields',
          'The fields are not complete in add new product'
        );

      const pool = req.body.db;

      await pool
        .request()
        .input('name', sql.VarChar, name)
        .input('description', sql.Text, description)
        .input('quantity', sql.Int, quantity)
        .query(queries.addNewProduct);

      res.json({ name, description, quantity });
    } catch (error) {
      next(error);
    }
  }

  async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      debug('Update Product Method');

      const { name, description, quantity } = req.body;

      if (!name || !description || !quantity)
        throw new HTTPError(
          400,
          'Bad request. Please complete all the fields',
          'The fields are not complete in update'
        );

      const { id } = req.params;

      if (!id)
        throw new HTTPError(
          400,
          'Bad request. Please complete the id',
          'The id is missing in the body.params'
        );

      const pool = req.body.db;

      await pool
        .request()
        .input('name', sql.VarChar, name)
        .input('description', sql.Text, description)
        .input('quantity', sql.Int, quantity)
        .input('Id', sql.Int, id)
        .query(queries.updateProductById);

      res.json({ name, description, quantity, id });
    } catch (error) {
      next(error);
    }
  }

  async deleteOneProduct(req: Request, res: Response, next: NextFunction) {
    try {
      debug('Delete One Product Method');

      const { id } = req.params;

      if (!id)
        throw new HTTPError(
          400,
          'Bad request. Please complete the id',
          'The id is missing in the body.params'
        );

      const pool = req.body.db;

      await pool
        .request()
        .input('Id', sql.Int, id)
        .query(queries.deleteProductById);

      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }

  async countAllProducts(req: Request, res: Response, next: NextFunction) {
    try {
      debug('Count All Products Method');

      const pool = req.body.db;

      const result = await pool.request().query(queries.countTotalProducts);

      res.json(result.recordset[0]['']);
    } catch (error) {
      next(error);
    }
  }
}
