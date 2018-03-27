/* eslint-disable */

import Request from "request";

const Chrono = {};

/**
 * Creates a base request func w/ ChronoGG Api Endpoint
 */
Chrono.ChronoQuest = Request.defaults({
  baseUrl: "https://api.chrono.gg/"
});

/**
 * Gets current sale from `/sale` endpoint from baseUrl
 *
 * @returns {Promise<any>} Resolves w/o parsed JSON object, otherwise rejects with request error
 */
Chrono.getSale = function() {
  return new Promise((resolve, reject) => {
    Chrono.ChronoQuest("sale", (err, res, body) => {
      if (err) reject(err);
      else resolve(JSON.parse(body));
    });
  });
};

/**
 * Gets shop listing from `/shop` endpoint from baseUrl
 *
 * @returns {Promise<any>} Resolves w/ parsed JSON object, otherwise rejects with request error
 */
Chrono.getShop = function() {
  return new Promise((resolve, reject) => {
    Chrono.ChronoQuest("shop", (err, res, body) => {
      if (err) reject(err);
      else resolve(JSON.parse(body));
    });
  });
};

export default Chrono;
