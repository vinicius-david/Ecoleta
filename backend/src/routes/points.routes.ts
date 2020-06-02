import express from 'express';
import { getRepository, Like } from 'typeorm';

import CreatePointService from '../services/CreatePointService';
import CreatePointsCategoriesService from '../services/CreatePointsCategoriesService';
import Point from '../models/Point';
import Category from '../models/Category';
import PointsCategories from '../models/PointsCategories';

const pointsRouter = express.Router();

pointsRouter.get('/', async (request, response) => {
  const { city, uf, categoriesParams } = request.query;

  const pointsRepository = getRepository(Point);
  const pointsCategoriesRepository = getRepository(PointsCategories);
  const categoriesRepository = getRepository(Category);

  const points = await pointsRepository.find({
    where: [
      { city: Like(`%${city}%`) },
      { uf: Like(`%${uf}%`) },
    ]
  });

  const pointCategories = await pointsCategoriesRepository.find({ where: { point_id: points[2].id } })
  const categoriesIds = pointCategories.map(item => item.category_id)

  const categories = await categoriesRepository.findByIds(categoriesIds);

  const pointsAndCategories = {
    ...points[0],
    categories,
  }

  return response.json({pointsAndCategories, categories});
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

  const point = await pointsRepository.findOne({ where: { id } });

  if (!point) return response.status(404).json({ message: 'Point not found' });

  const pointsCategoriesRepository = getRepository(PointsCategories);
  const categoriesRepository = getRepository(Category);

  const pointCategories = await pointsCategoriesRepository.find({ where: { point_id: point.id } })
  const categoriesIds = pointCategories.map(item => item.category_id)

  const categories = await categoriesRepository.findByIds(categoriesIds);

  return response.json({ point, categories });
});

export default pointsRouter;
