/* eslint-disable import/first */

import { app, BrowserWindow, Menu, Tray, nativeImage } from 'electron' // eslint-disable-line
import AutoLaunch from 'auto-launch';
import Storage from 'electron-json-storage';
import log from 'electron-log';
import isDev from 'electron-is-dev';
import path from 'path';
import { exec } from 'child_process';
import os from 'os';

log.transports.file.level = 'info';

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\') // eslint-disable-line
}

// Import after global __static
import Sale from './Chrono/Sale';
import Restock from './Chrono/Restock';

log.info(__static);

let mainWindow;
const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9080'
  : `file://${__dirname}/index.html`;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
  });

  mainWindow.loadURL(winURL);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.on('close', (event) => {
    if (!app.isQuiting) {
      event.preventDefault();
      mainWindow.hide();
    }

    return false;
  });

  const icon = nativeImage.createFromPath(path.join(__static, 'icons', 'icon.png'));

  const appIcon = new Tray(icon);

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Show App',
      click() {
        mainWindow.show();
      } },
    { label: 'Quit',
      click() {
        app.isQuiting = true;
        app.quit();
      } },
  ]);

  appIcon.setContextMenu(contextMenu);

  appIcon.on('double-click', () => {
    mainWindow.show();
  });

  mainWindow.tray = appIcon;
}

function tryRun() {
  Storage.get('preference', (err, data) => {
    if (!err) {
      if (data.daily === true) {
        Sale.run();
      }
      if (data.restock === true) {
        Restock.run();
      }
    } else log.error(err);
  });
}

app.on('ready', () => {
  createWindow();

  log.info(`${app.getName()} ready!`);

  log.info(`Executable path: ${app.getPath('exe')}`);

  Storage.has('preference', (err, has) => {
    if (err) log.error(err);
    else if (!has) {
      Storage.set('preference', {
        daily: true,
        restock: true,
      }, (err) => {
        if (err) log.error(err);
        else if (os.platform() === 'win32') {
          exec('reg add HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Notifications\\Settings\\Snore.DesktopToasts /t REG_DWORD /v ShowInActionCenter /d 1 /f', (err) => {
            if (err) log.error(err);

            tryRun();

            setInterval(tryRun, 60 * 30 * 1000);
          });
        } else {
          tryRun();

          setInterval(tryRun, 60 * 30 * 1000);
        }
      });
    } else {
      mainWindow.hide();

      tryRun();

      setInterval(tryRun, 60 * 30 * 1000);
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

if (!isDev) {
  new AutoLaunch({
    name: 'ChronoGG App',
    path: app.getPath('exe'),
    isHidden: true,
  }).enable();
}

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
