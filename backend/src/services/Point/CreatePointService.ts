import { getRepository } from 'typeorm';

import Point from '../../models/Point';

interface RequestDTO {
  image: string;
  name: string;
  email: string;
  whatsapp: string;
  latitude: number;
  longitude: number;
  city: string;
  uf: string;
}

class CreatePointService {
  public async execute({ image, name, email, whatsapp, latitude, longitude, city, uf }: RequestDTO) {
    const pointRepository = getRepository(Point);

    const point = pointRepository.create({
      image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60',
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    })

    await pointRepository.save(point);

    return point;
  }
}

export default CreatePointService;
