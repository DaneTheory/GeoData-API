/**
 * Geo Data Controller
 */

import HTTPStatus from 'http-status';

import Constants from '../config/Constants';
import GeoData from '../models/GeoData.model';
import {
  setDefaultDate,
  setDefaultTime,
  setDefaultTimeOfDay,
} from '../utils/timeAndDateUtils';

/**
 * @api {GET} /geodata/fetchGeoData Retrieve Geo Data
 * @apiDescription Retrieve's geo data as an object with the keys date, time, timeOfDay, latitude, and longitude.
 * @apiName fetchGeoData
 * @apiGroup GeoData
 *
 * @apiSuccess {Number} statusCode Response status from the request data.
 * @apiSuccess {String} date Date from Geo Data service formatted as MM-DD-YYYY using MomentJS. Ex: 04-23-1989.
 * @apiSuccess {String} time Time from Geo Data service formatted as hh:mm:ss using MomentJS. Ex: 05:23:14.
 * @apiSuccess {String} timeOfDay Time of day from Geo Data service formatted as 'A' using MomentJS. Ex: AM or PM.
 * @apiSuccess {Number} latitude Latitude from Geo Data service. Set in process ENV.
 * @apiSuccess {Number} longitude Longitude from Geo Data service. Set in process ENV.
 *
 * @apiSuccessExample {json} Success Response
 *
 * HTTP/1.1 200 OK
 *
 * {
 *  date: '04/23/1989',
 *  time: '12:35:05',
 *  timeOfDay: 'PM',
 *  latitude: 37.8267,
 *  longitude: -122.4233
 * }
 *
 * @apiErrorExample {json} Error TODO!!!
 *  HTTP/1.1 400 Bad Request
 *
 *  {
 *    token: 'service authorization token required'
 *  }
 */
export async function fetchGeoData(req, res, next) {
  const geoDataToUpdate = {
    date: setDefaultDate(Constants.TIMEZONE),
    time: setDefaultTime(Constants.TIMEZONE),
    timeOfDay: setDefaultTimeOfDay(Constants.TIMEZONE),
  };
  try {
    const geoData = await GeoData(geoDataToUpdate);
    res.status(HTTPStatus.OK).json(geoData.toJSON());
  } catch (e) {
    e.status = HTTPStatus.BAD_REQUEST;
    return next(e);
  }
}
