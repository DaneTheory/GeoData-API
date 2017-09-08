/**
 * Geo Data Routes
 */

import { Router } from 'express';

import * as GeoDataController from '../controllers/GeoData.controller';

const routes = new Router();

routes.get('/fetchGeoData', GeoDataController.fetchGeoData);

export default routes;
