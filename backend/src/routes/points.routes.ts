import express from 'express';
import multer from 'multer';
import { Joi, celebrate } from 'celebrate';

import multerConfig from '../config/multer';
import PointsController from '../controllers/PointsController';

const pointsRouter = express.Router();
const upload = multer(multerConfig);
const pointsController = new PointsController();

pointsRouter.get('/', pointsController.index);

pointsRouter.post('/', upload.single('image'), celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.number().required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    city: Joi.string().required(),
    uf: Joi.string().required().max(2),
    categories: Joi.string().required()
  })
}, {
  abortEarly: false
}), pointsController.create);

pointsRouter.get('/:id', pointsController.show);

pointsRouter.put('/:id', pointsController.update);

pointsRouter.delete('/:id', pointsController.delete);

export default pointsRouter;
