import express from 'express';
import { getRepository } from 'typeorm';

import CreateCategoryService from '../services/CreateCategoryService';
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
})

export default categoriesRouter;
