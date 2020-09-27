'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _abaculus = require('@mapbox/abaculus');

var _abaculus2 = _interopRequireDefault(_abaculus);

var _tilelive = require('@mapbox/tilelive');

var _tilelive2 = _interopRequireDefault(_tilelive);

var _map = require('./map');

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('tilelive-http')(_tilelive2.default);

var app = (0, _express2.default)();

var port = process.env.PORT || 3001;

function buildAbaculusOptionsAndMap(query, callback) {
  var mapErrorText = 'A "map" parameter must be passed and be a valid map id (integer).';
  var zoomErrorText = 'A "zoom" parameter must be passed and be a whole number between 1 and 22.';
  var widthErrorText = 'A "width" parameter must be passed and be a whole number between 1 and 5000.';
  var heightErrorText = 'A "height" parameter must be passed and be a whole number between 1 and 5000.';
  var latitudeErrorText = 'A "latitude" parameter must be passed and be a number between -90 and 90.';
  var longitudeErrorText = 'A "longitude" parameter must be passed and be a number between -180 and 180.';

  var errors = [];

  var map = null;
  var options = { center: {} };

  var mapId = query.map;
  if (!mapId) {
    errors.push(mapErrorText);
  } else {
    try {
      mapId = parseInt(mapId, 10);
    } catch (e) {
      errors.push(mapErrorText);
    }

    map = _map2.default.byId(mapId);

    if (!map) {
      errors.push(mapErrorText);
    }
  }

  var zoom = query.zoom;
  if (!zoom) {
    errors.push(zoomErrorText);
  } else {
    try {
      zoom = parseInt(zoom, 10);
      options.zoom = zoom - 1;
    } catch (e) {
      errors.push(zoomErrorText);
    }
  }

  var width = query.width;
  if (!width) {
    errors.push(widthErrorText);
  } else {
    try {
      width = parseInt(width, 10);
      options.center.w = width;
    } catch (e) {
      errors.push(widthErrorText);
    }
  }

  var height = query.height;
  if (!height) {
    errors.push(heightErrorText);
  } else {
    try {
      height = parseInt(height, 10);
      options.center.h = height;
    } catch (e) {
      errors.push(heightErrorText);
    }
  }

  var latitude = query.latitude;
  if (!latitude) {
    errors.push(latitudeErrorText);
  } else {
    try {
      latitude = parseFloat(latitude);
      options.center.y = latitude;
    } catch (e) {
      errors.push(latitudeErrorText);
    }
  }

  var longitude = query.longitude;
  if (!longitude) {
    errors.push(longitudeErrorText);
  } else {
    try {
      longitude = parseFloat(longitude);
      options.center.x = longitude;
    } catch (e) {
      errors.push(longitudeErrorText);
    }
  }

  if (errors.length === 0) {
    callback(null, options, map);
  } else {
    callback(errors.join(' '));
  }
}

app.listen(port, function () {
  return console.log('Listening on port ' + port + '.');
});

app.use('/', _express2.default.static('dist'));
app.use('/', _express2.default.static('public'));

app.get('/image', function (req, res) {
  buildAbaculusOptionsAndMap(req.query, function (error, abaculusOptions, map) {
    if (error) {
      res.status(400).send(error);
    } else {
      _tilelive2.default.load(map.tileLayerUrlLarge, function (err, source) {
        if (err) {
          throw err;
        }

        Object.assign(abaculusOptions, {
          scale: 1,
          tileSize: 1024,
          format: 'png',
          quality: 256,
          getTile: source.getTile.bind(source)
        });

        (0, _abaculus2.default)(abaculusOptions, function (er, image, headers) {
          if (er) {
            throw er;
          }
          res.set('Content-Type', 'image/png');
          res.send(image);
        });
      });
    }
  });
});
