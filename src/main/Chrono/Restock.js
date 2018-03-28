/* eslint-disable */

import Hazardous from "hazardous";
import { shell as Shell } from "electron";
import Notification from "node-notifier";
import Storage from "electron-json-storage";
import Chrono from "./Chrono";

const Restock = {};

/**
 * Storage helper saving arrays of game `_id` properties
 *
 * @param {String[]} ids - Array of game `_id` property
 * @returns {Promise<any>}
 */
Restock.store = function(ids) {
  return new Promise((resolve, reject) => {
    Storage.set(
      "shop",
      {
        ids: ids
      },
      err => {
        if (err) reject(err);
        else resolve();
      }
    );
  });
};

/**
 * Compares current announcements with storage in memory, resolving w/ unprecedented games
 *
 * @param {String[]} ids - Array of game `_id` property
 * @returns {Promise<any>} Resolves w/ unprecedented games, otherwise reject with storage error
 */
Restock.intersect = function(ids) {
  return new Promise((resolve, reject) => {
    Storage.get("shop", (err, data) => {
      if (err) reject(err);
      else {
        resolve(
          ids.filter(n => {
            return data.ids.indexOf(n) === -1;
          })
        );
      }
    });
  });
};

/**
 * Fires corresponding platform notifier
 *
 * @param {String} games - Concatenated list of games, delimited by `\n`
 */
Restock.notify = function(games) {
  const RN = Notification.notify({
    title: "ChronoGG Shop Restock",
    message: games,
    icon: require("path").join(__static, "icons", "icon.png"),
    sound: true,
    wait: true
  });

  RN.on("click", (notifierObject, options) => {
    Shell.openExternal("https://www.chrono.gg/shop");
  });
};

/**
 * Service runner for restock
 *
 * @returns {Promise<any>} Resolves(null) when complete & rejects when fail to fetch from Storage
 */
Restock.run = function() {
  return new Promise((resolve, reject) => {
    Chrono.getShop().then(shop => {
      const map = {};

      // Map & Filter
      const ids = shop.reduce((bin, e, i) => {
        if (e.status === "active" && e.sold_out === false) {
          map[e._id] = i;
          bin.push(e._id);
        }
        return bin;
      }, []);

      Storage.has("shop", (err, has) => {
        if (err) reject(err);
        else {
          if (has) {
            Restock.intersect(ids).then(intersects => {
              if (intersects.length > 0)
                Restock.notify(
                  intersects.map(e => shop[map[e]].name).join("\n")
                );
              Restock.store(ids);
            });
          } else {
            Restock.store(ids);
          }
        }
      });
    });
  });
};

export default Restock;
