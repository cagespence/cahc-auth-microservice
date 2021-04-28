/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */
import express from 'express';
import cors from 'cors';
import 'reflect-metadata';
import env from 'dotenv';
env.config();
import jwt from './_helpers/jwt';
import errorHandler from './_helpers/error-handler';

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

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
