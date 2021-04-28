/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */
import express from 'express';
import cors from 'cors';
import env from 'dotenv';
env.config();
import { createConnection } from 'typeorm';
import jwt from './_helpers/jwt';
import errorHandler from './_helpers/error-handler';
import 'reflect-metadata';

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/users', require('./users/users.controller'));

// global error handler
app.use(errorHandler);

createConnection({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'cagespence',
  password: '',
  database: 'cagespence',
  entities: [
    `${__dirname}/entity/**.js`,
  ],
  synchronize: true,
  logging: false,
}).then((connection) => {
  // here you can start to work with your entities
}).catch((error) => console.log(error));

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
