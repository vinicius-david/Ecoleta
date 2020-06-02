import express from 'express';

import pointsRouter from './points.routes';
import categoriesRouter from './categories.routes';

const routes = express.Router();

routes.get('/', (request, response) => {
  response.json({ message: "ok" });
});

routes.use('/points', pointsRouter);
routes.use('/categories', categoriesRouter);

export default routes;
