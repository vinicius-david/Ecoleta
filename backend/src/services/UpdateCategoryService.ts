import { getRepository } from 'typeorm';

import Category from '../models/Category';

interface RequestDTO {
  id: string;
  image: string;
  title: string;
}

class UpdateCategoryService {
  public async execute({ id, image, title }: RequestDTO) {
    const categoriesRepository = getRepository(Category);

    const category = await categoriesRepository.findOne(id);

    if (!category) throw new Error('Category not found.');

    category.image = image;
    category.title = title;

    await categoriesRepository.save(category);

    return category;
  }
}

export default UpdateCategoryService;
