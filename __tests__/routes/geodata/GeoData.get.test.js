import { expect } from 'chai';

import Constants from '../../../src/config/Constants';
import GeoData from '../../../src/models/GeoData.model';
import {
  setDefaultDate,
  setDefaultTime,
  setDefaultTimeOfDay,
} from '../../../src/utils/timeAndDateUtils';
import server from '../../../__mocks__/utils/server.mock';

const ENDPOINT = '/api/geodata/fetchGeoData';

let mockGeoData;
let actualGeoData;

const masterGeoData = {
  date: setDefaultDate(Constants.TIMEZONE),
  time: setDefaultTime(Constants.TIMEZONE),
  timeOfDay: setDefaultTimeOfDay(Constants.TIMEZONE),
  latitude: Constants.DEFAULT_LATITUDE,
  longitude: Constants.DEFAULT_LONGITUDE,
};

describe(`GET ${ENDPOINT}`, () => {
  before(async () => {
    await GeoData.remove();
    mockGeoData = await GeoData.create(masterGeoData);
  });

  beforeEach(() => {
    actualGeoData = {
      ...masterGeoData,
    };
  });

  it('Fetch with status 200', () => {
    const geoData = new GeoData();
    expect(geoData.date).to.equal(mockGeoData.date);
    expect(geoData.time).to.equal(geoData.time);
    expect(geoData.timeOfDay).to.equal(mockGeoData.timeOfDay);
    expect(geoData.latitude).to.equal(mockGeoData.latitude);
    expect(geoData.longitude).to.equal(mockGeoData.longitude);
  });

  describe('Fetch with status 200', () => {
    it('should fetch geo data', done => {
      server
        .get(ENDPOINT)
        .send()
        .end((err, res) => {
          const { status, body } = res;
          expect(status).to.equal(200);
          expect(body).to.haveOwnProperty('date');
          expect(body).to.haveOwnProperty('time');
          expect(body).to.haveOwnProperty('timeOfDay');
          expect(body).to.haveOwnProperty('latitude');
          expect(body).to.haveOwnProperty('longitude');
          done();
        });
    });
  });
});
