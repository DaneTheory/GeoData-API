/* eslint-disable import/no-mutable-exports */

import mongoose, { Schema } from 'mongoose';

import Constants from '../config/Constants';
import {
  setDefaultDate,
  setDefaultTime,
  setDefaultTimeOfDay,
} from '../utils/timeAndDateUtils';

const TimeOfDayTypes = ['AM', 'PM'];

const GeoDataSchema = new Schema(
  {
    date: {
      type: String,
      trim: true,
      default: setDefaultDate(Constants.TIMEZONE),
    },
    time: {
      type: String,
      trim: true,
      default: setDefaultTime(Constants.TIMEZONE),
    },
    timeOfDay: {
      type: String,
      trim: true,
      enum: TimeOfDayTypes,
      default: setDefaultTimeOfDay(Constants.TIMEZONE),
    },
    latitude: {
      type: Number,
      trim: true,
      default: Constants.DEFAULT_LATITUDE,
    },
    longitude: {
      type: Number,
      trim: true,
      default: Constants.DEFAULT_LONGITUDE,
    },
  },
  {
    timestamps: true,
  },
);

GeoDataSchema.methods = {
  /**
   * Parse the geodata object in data we want to send in response
   *
   * @public
   * @returns {Object} GeoData - Geo Data response body object
   */
  toJSON() {
    return {
      date: this.date,
      time: this.time,
      timeOfDay: this.timeOfDay,
      latitude: this.latitude,
      longitude: this.longitude,
    };
  },
};

let GeoData;

try {
  GeoData = mongoose.model('GeoData');
} catch (e) {
  GeoData = mongoose.model('GeoData', GeoDataSchema);
}

export default GeoData;
