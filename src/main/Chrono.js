/* eslint-disable */

import Request from 'request';

const Chrono = {};

Chrono.ChronoQuest = Request.defaults({
  baseUrl: 'https://api.chrono.gg/',
});

Chrono.getSale = function () {
  return new Promise((resolve, reject) => {
    Chrono.ChronoQuest('sale', (err, res, body) => {
      if (err) reject(err);
      else resolve(JSON.parse(body));
    });
  });
};

Chrono.getShop = function () {
  return new Promise((resolve, reject) => {
    Chrono.ChronoQuest('shop', (err, res, body) => {
      if (err) reject(err);
      else resolve(JSON.parse(body));
    });
  });
};

export default Chrono;
