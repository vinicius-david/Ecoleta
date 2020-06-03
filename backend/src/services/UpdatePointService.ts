import { getRepository } from 'typeorm';

import Point from '../models/Point';

interface RequestDTO {
  id: string;
  image: string;
  name: string;
  email: string;
  whatsapp: string;
  latitude: number;
  longitude: number;
  city: string;
  uf: string;
}

class UpdatePointService {
  public async execute({
    id, image, name, email, whatsapp, latitude, longitude, city, uf
  }: RequestDTO) {
    const pointsRepository = getRepository(Point);

    const point = await pointsRepository.findOne(id);

    if (!point) throw new Error('Point not founded');

    point.image = image;
    point.name = name;
    point.email = email;
    point.whatsapp = whatsapp;
    point.latitude = latitude;
    point.longitude = longitude;
    point.city = city;
    point.uf = uf

    await pointsRepository.save(point);

    return point;
  }
}

export default UpdatePointService;
