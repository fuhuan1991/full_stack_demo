// import { moment } from 'moment';
const moment = require('moment');

export const isEmpty = (obj) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}

export const isEmail = (s) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(s);

export function getCookie(name) {
  // Split cookie string and get all individual name=value pairs in an array
  var cookieArr = document.cookie.split(";");
  
  // Loop through the array elements
  for(var i = 0; i < cookieArr.length; i++) {
      var cookiePair = cookieArr[i].split("=");
      
      /* Removing whitespace at the beginning of the cookie name
      and compare it with the given string */
      if(name === cookiePair[0].trim()) {
          // Decode the cookie value and return
          return decodeURIComponent(cookiePair[1]);
      }
  }
  
  // Return null if not found
  return null;
}

export const momentToString = (obj) => {
  if(obj === null) return '';
  return obj.format("YYYY-MM-DD HH:mm:ss");
}

export const stringToMoment = (timeStr) => {
  if (timeStr === '') return null;
  return moment(timeStr);
}

export const compareTimeString = (a, b) => {
  if (a.time >= b.time) {
    return 1;
  } else {
    return -1;
  }
}

export const getEventInRange = (eventArray, d) => {
  if (!eventArray) return [];
  const start = moment();
  const end = moment().add(d, 'days');

  return eventArray.filter((event) => {
    const timeStr = event.time;
    const obj = moment(timeStr);
    if (obj.isBefore(end) && obj.isAfter(start)) {
      return true;
    } else {
      return false;
    }
  });
}
