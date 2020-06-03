import express, { request } from 'express';
import { getRepository } from 'typeorm';

import CreateCategoryService from '../services/CreateCategoryService';
import UpdateCategoryService from '../services/UpdateCategoryService';
import DeleteCategoryService from '../services/DeleteCategoryService';
import Category from '../models/Category';

const categoriesRouter = express.Router();

categoriesRouter.get('/', async (request, response) => {
  const categoriesRepository = getRepository(Category);

  const categories = await categoriesRepository.find();

  return response.json(categories);
});

categoriesRouter.post('/', async (request, response) => {
  const {
    image,
    title,
  } = request.body;

  const createCategory = new CreateCategoryService();

  const category = await createCategory.execute({
    image,
    title,
  })

  return response.json(category);
});

categoriesRouter.get('/:id', async (request, response) => {
  const { id } = request.params;

  const categoriesRepository = getRepository(Category);

  const category = await categoriesRepository.findOne(id);

  return response.json(category);
})

categoriesRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { image, title } = request.body;

  const updateCategory = new UpdateCategoryService();

  const category = await updateCategory.execute({id, image, title});

  return response.json(category);
})

categoriesRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteCategory = new DeleteCategoryService();

  await deleteCategory.execute({ id });

  return response.json({ message: 'Category deleted' });
})

export default categoriesRouter;
