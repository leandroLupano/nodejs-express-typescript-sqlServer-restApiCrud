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

productsRouter.get(
  '/count',
  productsController.countAllProducts.bind(productsController)
);

productsRouter.get(
  '/:id',
  productsController.getOneProduct.bind(productsController)
);

productsRouter.post(
  '/',
  productsController.addNewProduct.bind(productsController)
);

productsRouter.put(
  '/:id',
  productsController.updateProduct.bind(productsController)
);

productsRouter.delete(
  '/:id',
  productsController.deleteOneProduct.bind(productsController)
);
