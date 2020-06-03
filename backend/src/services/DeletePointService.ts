import { getRepository } from 'typeorm';

import Point from '../models/Point';

interface RequestDTO {
  id: string;
}

class DeletePointService {
  public async execute({ id }: RequestDTO) {
    const pointsRepository = getRepository(Point);

    await pointsRepository.delete(id);

    return;
  }
}

export default DeletePointService;
