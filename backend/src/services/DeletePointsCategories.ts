import { getRepository } from 'typeorm';

import PointsCategories from '../models/PointsCategories';

interface RequestDTO {
  id: string;
}

class DeletePointsCategoriesService {
  public async execute({ id }: RequestDTO): Promise<void> {
    const pointsCategoriesRepository = getRepository(PointsCategories);

    const pointsCategories = await pointsCategoriesRepository.find({ where: { point_id: id } });

    const poitnsCategoriesPromise = pointsCategories.map(point => pointsCategoriesRepository.delete(point));
    await Promise.all(poitnsCategoriesPromise);

    return;
  }
}

export default DeletePointsCategoriesService;
