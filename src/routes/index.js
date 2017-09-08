/**
 * API Routes
 */

import { Router } from 'express';
import HTTPStatus from 'http-status';

import GeoDataRoutes from './GeoData.routes';

import APIError from '../services/error';

// Middlewares
import logErrorService from '../services/log';

const routes = new Router();

routes.use('/geodata', GeoDataRoutes);

routes.all('*', (req, res, next) =>
  next(new APIError('SERVICE ERROR!', HTTPStatus.INTERNAL_SERVER_ERROR, true)),
);

routes.use(logErrorService);

export default routes;
