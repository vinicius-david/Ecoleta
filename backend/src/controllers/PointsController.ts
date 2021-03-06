import { Request, Response } from 'express';

import { getRepository } from 'typeorm';

import Serialize from '../config/serialize';

import CreatePointService from '../services/Point/CreatePointService';
import CreatePointsCategoriesService from '../services/CreatePointsCategoriesService';
import DeletePointsCategoriesService from '../services/DeletePointsCategories';
import UpdatePointService from '../services/Point/UpdatePointService';
import DeletePointService from '../services/Point/DeletePointService';
import Point from '../models/Point';
import Category from '../models/Category';
import PointsCategories from '../models/PointsCategories';

class PointsController {
  async index(request: Request, response: Response) {
    const { city, uf, categories } = request.query;

    const pointsRepository = getRepository(Point);
    const parsedCategories = String(categories).split(',').map(item => item.trim())

    if (!categories) {
      const categoriesRepository = getRepository(Category);
      const categoriesIds = await categoriesRepository.find();
      categoriesIds.map(category => parsedCategories.push(category.id));
      parsedCategories.shift();
    }

    const points = await pointsRepository.createQueryBuilder('points')
      .leftJoinAndSelect("point_categories", "point_categories", "points.id = point_categories.point_id")
      .where("point_categories.category_id IN (:...id)", { id: parsedCategories })
      .andWhere("points.uf = :uf", { uf: String(uf) })
      .andWhere("points.city = :city", { city: String(city) })
      .getMany()

    const serializedPoints = points.map(point => {
      return {
        ...point,
        image: Serialize(point.image),
      }
    });

    return response.json({points: serializedPoints});
  };

  async create(request: Request, response: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      categories,
    } = request.body;
    const image = request.file.filename;

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

    const categoriesArray = categories.split(',')
    const trimmedCategoriesArray = categoriesArray.map((item: string) => item.trim());

    const pointCategories = {
      categories: trimmedCategoriesArray,
      point_id: point.id
    }

    const createPointsCategories = new CreatePointsCategoriesService();

    await createPointsCategories.execute(pointCategories);

    return response.json(point);
  };

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const pointsRepository = getRepository(Point);

    const point = await pointsRepository.findOne(id);

    if (!point) return response.status(404).json({ message: 'Point not found' });

    const serializedPoint = {
      ...point,
      image: Serialize(point.image),
    }

    const pointsCategoriesRepository = getRepository(PointsCategories);
    const categoriesRepository = getRepository(Category);

    const pointCategories = await pointsCategoriesRepository.find({ where: { point_id: point.id } })
    const categoriesIds = pointCategories.map(item => item.category_id)

    const categories = await categoriesRepository.findByIds(categoriesIds);

    return response.json({ point: serializedPoint, categories });
  };

  async update(request: Request, response: Response) {
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

    const deletePointsCategories = new DeletePointsCategoriesService();
    await deletePointsCategories.execute({ id });

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

    const pointCategories = {
      categories,
      point_id: point.id
    }

    const createPointsCategories = new CreatePointsCategoriesService();
    await createPointsCategories.execute(pointCategories);

    return response.json(point);
  };

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const deletePointsCategories = new DeletePointsCategoriesService();
    await deletePointsCategories.execute({ id });

    const deletePoint = new DeletePointService();
    await deletePoint.execute({ id });

    return response.json({ message: 'Point deleted.' })
  }
};

export default PointsController;
