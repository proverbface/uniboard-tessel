/**
 * Created by cshao on 19/01/2018.
 */

'use strict';

const http = require('http');
const https = require('https');
const mqtt = require('mqtt');

const EventEmitter = require('events');

function getLocation(url) {
  var match = url.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);
  return match && {
    protocol: match[1],
    host: match[2],
    hostname: match[3],
    port: match[4],
    pathname: match[5],
    search: match[6],
    hash: match[7]
  }
}

class TesselClient extends EventEmitter {
  constructor(token) {
    super();
    this.token = token ? token : null;
    this.mqttClient = null;
  }

  setToken(token) {
    if (token) {
      this.token = token;
    }
  }

  http(url, data, callback) {
    if (!url || !(data && typeof data === 'object' && Object.keys(data).length > 0)) {
      return;
    }

    let postData = JSON.stringify(data);

    let locationObj = getLocation(url);
    let agent;
    let defaultPort;
    if (locationObj.protocol === 'http:') {
      agent = http;
      defaultPort = 80;
    } else if (locationObj.protocol === 'https:') {
      agent = https;
      defaultPort = 443;
    } else {
      throw new Error('Unknown protocol in URL: ' + url);
    }
    let options = {
      protocol: locationObj.protocol,
      hostname: locationObj.hostname,
      port: locationObj.port ? locationObj.port : defaultPort,
      path: locationObj.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'X-Uniboard-Token': this.token ? this.token : ''
      }
    };

    let req = agent.request(options, (res) => {
      let responseText = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        responseText += chunk;
      });
      res.on('end', () => {
        callback(null, responseText);
      });
    });
    req.on('error', (e) => {
      callback(e);
    });

    req.write(postData);
    req.end();
  }

  connectMQTT() {
    this.mqttClient = mqtt.connect('mqtt://uniboard.io:1883', {
      clientId: this.token ? this.token : 'mqttjs_' + Math.random().toString(16).substr(2, 8)
    });
    this.mqttClient.on('connect', function () {
      this.emit('MQTT-connected', 'MQTT server connected');
    }.bind(this));
  }
  mqtt(topic, data) {
    if (!this.mqttClient) {
      this.connectMQTT();
    }
    this.mqttClient.publish(topic, JSON.stringify(data));
  }
}

module.exports = function(token) {
  return new TesselClient(token);
};