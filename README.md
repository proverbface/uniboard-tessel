# uniboard-tessel
`uniboard-tessel` is a [Uniboard](https://uniboard.io) client library for [Tessel](https://www.tessel.io/) device.
With `uniboard-tessel`, sending data to Uniboard system through HTTP(S) or MQTT protocol would be pretty easy and simple.

## Installation
```sh
$ npm install --save uniboard-tessel
```

## Usage
To import `uniboard-tessel` module and create a client object:
```js
// Pass token when creating client object. The token is used for client authentication and can be found in Uniboard's Settings tab.
var tesselClient = require('uniboard-tessel')('25f6db34-9ff1-47f4-b7bb-3721cafb2e23');

// If the device does not need authentication, just omit the token.
var tesselClient = require('uniboard-tessel')();
```

To send data through HTTP(S) protocol:
```js
// clientObject.http(deviceURL, dataObject, callback);
tesselClient.http('https://uniboard.io/data_api/device/59db5cd3d6021211cb346b0b', {
  "temp": 21.2,
  "humidity": 29.8
}, function(err, res) {
  if (err) {
    console.log(err);
  }
  if (res) {
    console.log(res);
  }
});
```

To send data through MQTT protocol:
```js
tesselClient.connectMQTT();
tesselClient.on('MQTT-connected', function() {
  // clientObject.mqtt(deviceTopic, dataObject);
  tesselClient.mqtt('/data_api/device/59db5cd3d6021211cb346b0b', {
    "temp": 21.2,
    "humidity": 29.8
  });
});
```

## License
(The MIT License)

Copyright (c) 2016 Chuan Shao &lt;shaochuancs@gmail.com&gt;
