# uniboard-tessel
`uniboard-tessel` is a [Uniboard](https://uniboard.io) client library for [Tessel](https://www.tessel.io/) device.
With `uniboard-tessel`, sending data to Uniboard system through HTTP(S) or MQTT protocol would be pretty easy and simple.

## Installation
```sh
$ npm install --save uniboard-tessel
```

## Usage
Import `uniboard-tessel` module and create a client object:
```js
// Pass token when creating client object. The token is used for client authentication and can be found in Uniboard's Settings tab.
var tesselClient = require('uniboard-tessel')('25f6db34-9ff1-47f4-b7bb-000000fb2e23');

// If the device does not need authentication, just omit the token.
var tesselClient = require('uniboard-tessel')();
```

Send data through HTTP(S) protocol:
```js
// clientObject.http(<deviceURL>, <dataObject>, <callback>);
tesselClient.http('https://uniboard.io/data_api/device/59db5cd3d6000000cb346b0b', {
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

Send data through MQTT protocol:
```js
// clientObject.connectMQTT();
// clientObject.mqtt(<deviceTopic>, <dataObject>);
tesselClient.connectMQTT();
tesselClient.on('MQTT-connected', function() {
  tesselClient.mqtt('/data_api/device/59db5cd3d6000000cb346b0b', {
    "temp": 21.2,
    "humidity": 29.8
  });
});
```

## License
(The MIT License)

Copyright (c) 2017-2018 Chuan Shao &lt;shaochuancs@gmail.com&gt;
