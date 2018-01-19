'use strict';var _typeof='function'==typeof Symbol&&'symbol'==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&'function'==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?'symbol':typeof a},_createClass=function(){function a(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,'value'in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}();function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}function _possibleConstructorReturn(a,b){if(!a)throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');return b&&('object'==typeof b||'function'==typeof b)?b:a}function _inherits(a,b){if('function'!=typeof b&&null!==b)throw new TypeError('Super expression must either be null or a function, not '+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}var _http=require('http'),https=require('https'),mqtt=require('mqtt'),EventEmitter=require('events');function getLocation(a){var b=a.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);return b&&{protocol:b[1],host:b[2],hostname:b[3],port:b[4],pathname:b[5],search:b[6],hash:b[7]}}var TesselClient=function(a){function b(a){_classCallCheck(this,b);var c=_possibleConstructorReturn(this,(b.__proto__||Object.getPrototypeOf(b)).call(this));return c.token=a?a:null,c.mqttClient=null,c}return _inherits(b,a),_createClass(b,[{key:'setToken',value:function setToken(a){a&&(this.token=a)}},{key:'http',value:function http(a,b,c){if(a&&b&&'object'===('undefined'==typeof b?'undefined':_typeof(b))&&0<Object.keys(b).length){var d,e,f=JSON.stringify(b),g=getLocation(a);if('http:'===g.protocol)d=_http,e=80;else if('https:'===g.protocol)d=https,e=443;else throw new Error('Unknown protocol in URL: '+a);var h={protocol:g.protocol,hostname:g.hostname,port:g.port?g.port:e,path:g.pathname,method:'POST',headers:{"Content-Type":'application/json',"Content-Length":Buffer.byteLength(f),"X-Uniboard-Token":this.token}},i=d.request(h,function(a){var b='';a.setEncoding('utf8'),a.on('data',function(a){b+=a}),a.on('end',function(){c(null,b)})});i.on('error',function(a){c(a)}),i.write(f),i.end()}}},{key:'connectMQTT',value:function connectMQTT(){this.mqttClient=mqtt.connect('mqtt://uniboard.io:1883',{clientId:this.token?this.token:'mqttjs_'+Math.random().toString(16).substr(2,8)}),this.mqttClient.on('connect',function(){this.emit('MQTT-connected','MQTT server connected')}.bind(this))}},{key:'mqtt',value:function(a,b){this.mqttClient||this.connectMQTT(),this.mqttClient.publish(a,JSON.stringify(b))}}]),b}(EventEmitter);module.exports=function(a){return new TesselClient(a)};