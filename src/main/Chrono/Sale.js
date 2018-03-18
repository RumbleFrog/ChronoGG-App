/* eslint-disable */

import { Notification } from 'electron';
import Storage from 'electron-json-storage';
import Path from 'path';
import Chrono from './Chrono';

const Sale = {};

Sale.getLast = function () {
    return new Promise((resolve, reject) => {
        Storage.get('sale', (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

Sale.store = function (data) {
    return new Promise((resolve, reject) => {
        Storage.set('sale', {
            id: data.name.toBase64(),
            meta: data,
        }, (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
}

Sale.notify = function (data) {
    new Notification({
        title: 'ChronoGG Daily Deal',
        body: data.name,
        icon: Path.join(__static, 'icons', 'icon.png'),
    })
}

Sale.run = function () {
    return new Promise((resolve, reject) => {
        const Current = Chrono.getSale()[0];

        Storage.has('sale', (err, has) => {
            if (err) reject(err);
            else {
                if (!has) {
                    Sale.store(Current);
                    Sale.notify(Current);
                } else {
                    Sale
                        .getLast()
                        .then((last) => {
                            if (last.id !== Current.name.toBase64()) {
                                Sale.store(Current);
                                Sale.notify(Current);
                            }
                        })
                }
            }
        })
    })
}

export default Sale;
