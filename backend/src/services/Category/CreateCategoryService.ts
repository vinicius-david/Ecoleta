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
      image: `http://192.168.100.16:3333/files/${image}.svg`,
      title,
    });

    await categoriesRepository.save(category);

    return category;
  }
}

export default CreateCategoryService;
