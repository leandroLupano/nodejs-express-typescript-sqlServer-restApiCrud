import { Router as router } from 'express';
import createDebug from 'debug';
import { ProductsController } from '../controller/products.controller.js';

const debug = createDebug('SERVER:router');
debug('router-initiated');

export const productsRouter = router();

const productsController = new ProductsController();

productsRouter.get(
  '/',
  productsController.getAllProducts.bind(productsController)
);

productsRouter.get('/:id');

productsRouter.post('/');

productsRouter.put('/:id');

productsRouter.delete('/:id');

productsRouter.get('/count');
