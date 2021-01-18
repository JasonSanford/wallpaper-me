import express from 'express';
import abaculus from '@mapbox/abaculus';
import tilelive from '@mapbox/tilelive';

require('tilelive-http')(tilelive);

import Map from './map';

const app = express();

const port = (process.env.PORT || 3001);

function buildAbaculusOptionsAndMap(query, callback) {
  const mapErrorText = 'A "map" parameter must be passed and be a valid map id (integer).';
  const zoomErrorText = 'A "zoom" parameter must be passed and be a whole number between 1 and 22.';
  const widthErrorText = 'A "width" parameter must be passed and be a whole number between 1 and 5000.';
  const heightErrorText = 'A "height" parameter must be passed and be a whole number between 1 and 5000.';
  const latitudeErrorText = 'A "latitude" parameter must be passed and be a number between -90 and 90.';
  const longitudeErrorText = 'A "longitude" parameter must be passed and be a number between -180 and 180.';

  const errors = [];

  let map = null;
  const options = { center: {} };

  let mapId = query.map;
  if (!mapId) {
    errors.push(mapErrorText);
  } else {
    try {
      mapId = parseInt(mapId, 10);
    } catch (e) {
      errors.push(mapErrorText);
    }

    map = Map.byId(mapId);

    if (!map) {
      errors.push(mapErrorText);
    }
  }

  let zoom = query.zoom;
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

  let width = query.width;
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

  let height = query.height;
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

  let latitude = query.latitude;
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

  let longitude = query.longitude;
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

app.listen(port, () => console.log(`Listening on port ${port}.`));

app.use('/', express.static('dist'));
app.use('/', express.static('public'));

app.get('/image', (req, res) => {
  buildAbaculusOptionsAndMap(req.query, (error, abaculusOptions, map) => {
    if (error) {
      res.status(400).send(error);
    } else {
      tilelive.load(map.tileLayerUrlLarge, (err, source) => {
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

        abaculus(abaculusOptions, (er, image) => {
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
