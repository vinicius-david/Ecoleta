import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import CreateCategoryService from '../services/Category/CreateCategoryService';
import UpdateCategoryService from '../services/Category/UpdateCategoryService';
import DeleteCategoryService from '../services/Category/DeleteCategoryService';
import Category from '../models/Category';
import PointsCategories from '../models/PointsCategories';

class CategoriesController {
  async index(request: Request, response: Response) {
    const categoriesRepository = getRepository(Category);

    const categories = await categoriesRepository.find();

    return response.json(categories);
  };

  async create(request: Request, response: Response) {
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
  };

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const categoriesRepository = getRepository(Category);

    const category = await categoriesRepository.findOne(id);

    return response.json(category);
  };

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { image, title } = request.body;

    const updateCategory = new UpdateCategoryService();

    const category = await updateCategory.execute({id, image, title});

    return response.json(category);
  };

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const pointsCategoriesRepository = getRepository(PointsCategories);
    const pointsCategories = await pointsCategoriesRepository.find({ where: { category_id: id } });

    if (pointsCategories.length !== 0)
    return response.json({ message: "Categories collected by points can't be deleted." })

    const deleteCategory = new DeleteCategoryService();
    await deleteCategory.execute({ id });

    return response.json({ message: 'Category deleted' });
  };
};

export default CategoriesController;
