import express from 'express';
import path from 'path';
import cors from 'cors';
import 'reflect-metadata';
import { errors } from 'celebrate';

import routes from './routes';

import './database';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(errors());

app.listen(3333, () => {
  console.log('Server is running in localhost 3333!');
});
