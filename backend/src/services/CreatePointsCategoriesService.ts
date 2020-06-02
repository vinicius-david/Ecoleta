import { getRepository } from 'typeorm';

import PointsCategories from '../models/PointsCategories';

interface RequestDTO {
  categories: string[];
  point_id: string;
}

class CreatePointsCategoriesService {
  public async execute({ categories, point_id }: RequestDTO) {
    const pointsCategoriesRepository = getRepository(PointsCategories);

    const pointsCategoriesIds = categories.map(category => {
      return {
        category_id: category,
        point_id: point_id,
      }
    })

    const createdPointsCategories = pointsCategoriesRepository.create(
      pointsCategoriesIds.map(item => ({
        category_id: item.category_id,
        point_id: item.point_id
      }))
    )

    await pointsCategoriesRepository.save(createdPointsCategories);

    return
  }
}

export default CreatePointsCategoriesService;
