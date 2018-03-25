/* eslint-disable */

import Hazardous from "hazardous";
import Notification from "node-notifier";
import Storage from "electron-json-storage";
import Chrono from "./Chrono";

const Sale = {};

Sale.getLast = function() {
  return new Promise((resolve, reject) => {
    Storage.get("sale", (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

Sale.store = function(data) {
  return new Promise((resolve, reject) => {
    Storage.set(
      "sale",
      {
        id: Buffer.from(data.name).toString("base64"),
        meta: data
      },
      err => {
        if (err) reject(err);
        else resolve();
      }
    );
  });
};

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

Sale.run = function(window) {
  return new Promise((resolve, reject) => {
    Chrono.getSale().then(Current => {
      Storage.has("sale", (err, has) => {
        if (err) reject(err);
        else {
          if (!has) {
            Sale.store(Current);
            Sale.notify(Current, window);
          } else {
            Sale.getLast().then(last => {
              if (last.id !== new Buffer(Current.name).toString("base64")) {
                Sale.store(Current);
                Sale.notify(Current, window);
              }
            });
          }
        }
      });
    });
  });
};

export default Sale;
