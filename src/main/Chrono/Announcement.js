/* eslint-disable */

import Hazardous from "hazardous";
import { shell as Shell } from "electron";
import Notification from "node-notifier";
import Storage from "electron-json-storage";
import Request from "request";

const Announcement = {};

Announcement.fetch = function() {
  return new Promise((resolve, reject) => {
    Request(
      "https://rumblefrog.github.io/ChronoGG-App/announcements.json",
      (err, res, body) => {
        if (err) reject(err);
        else resolve(JSON.parse(body));
      }
    );
  });
};

Announcement.intersect = function(announcements) {
  return new Promise((resolve, reject) => {
    Storage.get("announcements", (err, data) => {
      if (err) reject(err);
      else {
        resolve(
          announcements.filter(n => {
            return data.announcements.indexOf(n._id) === -1;
          })
        );
      }
    });
  });
};

Announcement.store = function(announcements) {
  return new Promise((resolve, reject) => {
    Storage.set(
      "announcements",
      {
        announcements: announcements.map(a => a._id)
      },
      err => {
        if (err) reject(err);
        else resolve();
      }
    );
  });
};

Announcement.notify = function(announcements) {
  announcements.forEach(a => {
    const AN = Notification.notify({
      title: a.title,
      message: a.body,
      icon: require("path").join(__static, "icons", "icon.png"),
      sound: true,
      wait: true
    });

    AN.on("click", (notifierObject, options) => {
      if (a.link !== "") Shell.openExternal(a.link);
    });
  });
};

/**
 * Service runner for announcement
 * 
 * @return {Promise} Resolves when complete & rejects when fail to fetch from Storage
 */
Announcement.run = function() {
  return new Promise((resolve, reject) => {
    Announcement.fetch().then(announcements => {
      Storage.has("announcements", (err, has) => {
        if (err) reject(err);
        else {
          if (!has) Announcement.store(announcements);
          else {
            Announcement.store(announcements);
            Announcement.intersect(announcements).then(intersections => {
              if (intersections.length > 0) Announcement.notify(intersections);
            });
          }
          resolve();
        }
      });
    });
  });
};

export default Announcement;
