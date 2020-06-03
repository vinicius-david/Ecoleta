import { getRepository } from 'typeorm';

import Category from '../../models/Category';

interface RequestDTO {
  image: string;
  title: string;
}

class CreateCategoryService {
  public async execute({ image, title }: RequestDTO) {
    const categoriesRepository = getRepository(Category);

    const category = categoriesRepository.create({
      image,
      title,
    });

    await categoriesRepository.save(category);

    return category;
  }
}

export default CreateCategoryService;
