/* eslint-disable */

import Hazardous from "hazardous";
import Notification from "node-notifier";
import Storage from "electron-json-storage";
import Chrono from "./Chrono";

const Sale = {};

/**
 * Retrieves the previous stored sale object from Storage
 *
 * @note Assumes `sale` key exists already
 * @returns {Promise<any>} Resolves with sale object, otherwise rejects with Storage error
 */
Sale.getLast = function() {
  return new Promise((resolve, reject) => {
    Storage.get("sale", (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

/**
 * Storage helper to save data from `/sale` endpoint
 *
 * @param {Object} data - Data derived from `/sale` endpoint
 * @param {BrowserWindow} window - Instance of BrowserWindow in which to use to send IPC messages
 * @returns {Promise<any>} Resolves({void}) when complete, otherwise rejects with Storage save error
 */
Sale.store = function(data, window) {
  return new Promise((resolve, reject) => {
    Storage.set(
      "sale",
      {
        id: Buffer.from(data.name).toString("base64"),
        meta: data
      },
      err => {
        if (err) reject(err);
        else {
          window.webContents.send("dispatchSale", data);
          resolve();
        }
      }
    );
  });
};

/**
 * Fires corresponding platform notifier
 *
 * @param {Object} data - Object derived from `/sale` endpoint
 * @param {BrowserWindow} window - Instance of BrowserWindow in which to use to send IPC messages
 */
Sale.notify = function(data, window) {
  const SN = Notification.notify({
    title: "ChronoGG Daily Deal",
    message: data.name,
    icon: require("path").join(__static, "icons", "icon.png"),
    sound: true,
    wait: true
  });

  SN.on("click", (notifierObject, options) => {
    window.show();
    window.webContents.send("saleprompt", data);
  });
};

/**
 * Service runner for sale
 *
 * @param {BrowserWindow} window - BrowserWindow in which to use to send IPC messages
 * @returns {Promise<any>} Resolves(null) when complete & rejects when fail to fetch from Storage
 */
Sale.run = function(window) {
  return new Promise((resolve, reject) => {
    Chrono.getSale().then(Current => {
      Storage.has("sale", (err, has) => {
        if (err) reject(err);
        else {
          if (!has)
            Sale.store(Current, window).then(() =>
              Sale.notify(Current, window)
            );
          else {
            Sale.getLast().then(last => {
              if (last.id !== new Buffer(Current.name).toString("base64"))
                Sale.store(Current, window).then(() =>
                  Sale.notify(Current, window)
                );
              Sale.store(Current, window);
            });
          }
        }
      });
    });
  });
};

export default Sale;
