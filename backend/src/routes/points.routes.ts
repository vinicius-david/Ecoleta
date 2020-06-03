import express from 'express';
import { getRepository } from 'typeorm';

import CreatePointService from '../services/CreatePointService';
import CreatePointsCategoriesService from '../services/CreatePointsCategoriesService';
import UpdatePointService from '../services/UpdatePointService';
import DeletePointService from '../services/DeletePointService';
import Point from '../models/Point';
import Category from '../models/Category';
import PointsCategories from '../models/PointsCategories';

const pointsRouter = express.Router();

pointsRouter.get('/', async (request, response) => {
  const { city, uf, categories } = request.query;

  const pointsRepository = getRepository(Point);

  const parsedCategories = String(categories).split(',').map(item => item.trim())

  if (!categories) {
    parsedCategories.shift();

    const pointsCategoriesRepository = getRepository(PointsCategories);
    const pointCategories = await pointsCategoriesRepository.find();
    pointCategories.map(item => parsedCategories.push(item.category_id));
  }

  const points = await pointsRepository.createQueryBuilder('points')
    .leftJoinAndSelect("point_categories", "point_categories", "points.id = point_categories.point_id")
    .where("point_categories.category_id IN (:...id)", { id: parsedCategories })
    .orWhere("points.uf = :uf", { uf: String(uf) })
    .orWhere("points.city = :city", { city: String(city) })
    .getMany()

  return response.json(points);
});

pointsRouter.post('/', async (request, response) => {
  const {
    image,
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf,
    categories,
  } = request.body;

  const createPoint = new CreatePointService();

  const point = await createPoint.execute({
    image,
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf,
  })

  const pointCategories = {
    categories,
    point_id: point.id
  }

  const createPointsCategories = new CreatePointsCategoriesService();

  await createPointsCategories.execute(pointCategories);

  return response.json(point);
});

pointsRouter.get('/:id', async (request, response) => {
  const { id } = request.params;

  const pointsRepository = getRepository(Point);

  const point = await pointsRepository.findOne(id);

  if (!point) return response.status(404).json({ message: 'Point not found' });

  const pointsCategoriesRepository = getRepository(PointsCategories);
  const categoriesRepository = getRepository(Category);

  const pointCategories = await pointsCategoriesRepository.find({ where: { point_id: point.id } })
  const categoriesIds = pointCategories.map(item => item.category_id)

  const categories = await categoriesRepository.findByIds(categoriesIds);

  return response.json({ point, categories });
});

pointsRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const {
    image,
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf,
    categories,
  } = request.body;

  const updatePoint = new UpdatePointService();

  const point = await updatePoint.execute({
    id,
    image,
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf,
  });

  return response.json(point);
})

pointsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deletePoint = new DeletePointService();

  await deletePoint.execute({ id });

  return response.json({ message: 'Point deleted.' })
})

export default pointsRouter;
