import express from 'express';
import path from 'path';
import 'reflect-metadata';

import routes from './routes';

import './database';

const app = express();
app.use(express.json());

app.use(routes);

app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.listen(3333, () => {
  console.log('Server is running in localhost 3333!');
});
