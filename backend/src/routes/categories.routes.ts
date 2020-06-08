import express from 'express';

import CategoriesController from '../controllers/CategoriesController';

const categoriesRouter = express.Router();
const categoriesController = new CategoriesController();

categoriesRouter.get('/', categoriesController.index);

categoriesRouter.post('/', categoriesController.create);

categoriesRouter.get('/:id', categoriesController.show);

categoriesRouter.put('/:id', categoriesController.update);

categoriesRouter.delete('/:id', categoriesController.delete);

export default categoriesRouter;
