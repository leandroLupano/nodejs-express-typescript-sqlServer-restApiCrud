import cors from 'cors';
import createDebug from 'debug';
import express from 'express';
import morgan from 'morgan';

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

app.get('/', (_req, res) => {
  res.json({
    info: 'Server Node.js + Express + SQL Server',
    endpoints: {
      products: '/products',
    },
  });
});
