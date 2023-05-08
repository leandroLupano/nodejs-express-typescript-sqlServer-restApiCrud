import cors from 'cors';
import createDebug from 'debug';
import express from 'express';
import morgan from 'morgan';
import { productsRouter } from './router/products.router.js';
import { dbConnection } from './database/database.connection.js';
import { errorsMiddleware } from './errors/errors.middleware.js';

const debug = createDebug('SERVER:app');
debug('app-initiated');

export const app = express();

const corsOptions = {
  origin: '*',
};
app.disable('x-powered-by');
app.use(morgan('dev'));
app.use(express.json());
app.use(cors(corsOptions));
app.use(dbConnection);

app.use('/products', productsRouter);

app.use(errorsMiddleware);

app.get('/', (_req, res) => {
  res.json({
    info: 'Server Node.js + Express + SQL Server',
    endpoints: {
      products: '/products',
    },
  });
});
