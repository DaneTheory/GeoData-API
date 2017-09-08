import { expect } from 'chai';

import Constants from '../../src/config/Constants';
import GeoData from '../../src/models/GeoData.model';
import {
  setDefaultDate,
  setDefaultTime,
  setDefaultTimeOfDay,
} from '../../src/utils/timeAndDateUtils';

let mockGeoData;
let actualGeoData;

const masterGeoData = {
  date: setDefaultDate(Constants.TIMEZONE),
  time: setDefaultTime(Constants.TIMEZONE),
  timeOfDay: setDefaultTimeOfDay(Constants.TIMEZONE),
  latitude: Constants.DEFAULT_LATITUDE,
  longitude: Constants.DEFAULT_LONGITUDE,
};

describe('Model: GeoData', () => {
  before(async () => {
    await GeoData.remove();
    mockGeoData = await GeoData.create(masterGeoData);
  });

  beforeEach(() => {
    actualGeoData = {
      ...masterGeoData,
    };
  });

  it('Fetched geo data', () => {
    const geoData = new GeoData();
    expect(geoData.date).to.equal(mockGeoData.date);
    expect(geoData.time).to.equal(mockGeoData.time);
    expect(geoData.timeOfDay).to.equal(mockGeoData.timeOfDay);
    expect(geoData.latitude).to.equal(mockGeoData.latitude);
    expect(geoData.longitude).to.equal(mockGeoData.longitude);
  });

  describe('#fetchGeoData()', async () => {
    const geoDataToUpdate = {
      date: setDefaultDate(Constants.TIMEZONE),
      time: setDefaultTime(Constants.TIMEZONE),
      timeOfDay: setDefaultTimeOfDay(Constants.TIMEZONE),
    };
    const tempMasterGeoData = {
      date: geoDataToUpdate.date,
      time: geoDataToUpdate.time,
      timeOfDay: geoDataToUpdate.timeOfDay,
      latitude: Number(Constants.DEFAULT_LATITUDE),
      longitude: Number(Constants.DEFAULT_LONGITUDE),
    };
    const geoData = await GeoData(geoDataToUpdate);
    geoData.toJSON();

    it('should return date', () => {
      expect(geoData._doc.date).to.equal(tempMasterGeoData.date);
    });

    it('should return time', () => {
      expect(geoData._doc.time).to.equal(tempMasterGeoData.time);
    });

    it('should return timeOfDay', () => {
      expect(geoData._doc.timeOfDay).to.equal(tempMasterGeoData.timeOfDay);
    });

    it('should return latitude', () => {
      expect(geoData._doc.latitude).to.equal(tempMasterGeoData.latitude);
    });

    it('should return longitude', () => {
      expect(geoData._doc.longitude).to.equal(tempMasterGeoData.longitude);
    });
  });
});
