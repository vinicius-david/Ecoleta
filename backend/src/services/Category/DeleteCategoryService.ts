import { getRepository } from 'typeorm';

import Category from '../../models/Category';

interface RequestDTO {
  id: string;
}

class DeleteCategoryService {
  public async execute({ id }: RequestDTO) {
    const categoriesRepository = getRepository(Category);

    await categoriesRepository.delete(id);

    return;
  }
}

export default DeleteCategoryService;
