/**
 * Created by cshao on 19/01/2018.
 */

'use strict';

let tesselClient = require('./dist/index')('25f6db34-9ff1-47f4-b7bb-3721cafb2e23');

// Send HTTP(S) data
tesselClient.http('https://uniboard.io/data_api/device/59db5cd3d6021211cb346b0b', {
  "temp": 21,
  "humidity": 29
}, function(err, res) {
  if (err) {
    console.log(err);
  }
  if (res) {
    console.log(res);
  }
});

// Send MQTT data
tesselClient.connectMQTT();
tesselClient.on('MQTT-connected', function() {
  tesselClient.mqtt('/data_api/device/59db5cd3d6021211cb346b0b', {
    "temp": 33,
    "humidity": 12
  });
});
