/* eslint-disable import/no-mutable-exports */
/* eslint-disable arrow-body-style */

// import Moment from 'moment'
import Moment from 'moment-timezone';

const dateFormat = 'MM-DD-YYYY';
const timeFormat = 'hh:mm:ss';
const timeOfDayFormat = 'A';

export const setDefaultDate = envTimezone => {
  return Moment.tz(envTimezone).format(dateFormat);
};

export const setDefaultTime = envTimezone => {
  return Moment.tz(envTimezone).format(timeFormat);
};

export const setDefaultTimeOfDay = envTimezone => {
  return Moment.tz(envTimezone).format(timeOfDayFormat);
};
