'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var myTokenDontStealPlz = 'pk.eyJ1IjoiamNzYW5mb3JkIiwiYSI6ImNrZG1kdnU5NzE3bG4yenBkbzU5bDQ2NXMifQ.IMquilPKSANQDaSzf3fjcg';

var mapDefs = [{
  id: 1,
  name: 'Camo',
  mapboxId: 'jcsanford/cj9jzooiu07vn2rrrfeyadu0d',
  token: myTokenDontStealPlz
}, {
  id: 2,
  name: 'Decimal',
  mapboxId: 'jcsanford/cj9k1jqkk09ld2rrrp1gkxwkh',
  token: myTokenDontStealPlz
}, {
  id: 3,
  name: 'Leather',
  mapboxId: 'jcsanford/cj9q6aega23ft2snxua2p0hkw',
  token: myTokenDontStealPlz
}, {
  id: 4,
  name: 'Flyknit',
  mapboxId: 'jcsanford/cj9k19xkb09d02rs1i6v18oq7',
  token: myTokenDontStealPlz
}, {
  id: 5,
  name: 'Pumpkin Spice',
  mapboxId: 'jcsanford/cj9jyxpvd073o2roao0pgq1pw',
  token: myTokenDontStealPlz
}, {
  id: 6,
  name: 'Stars and Stripes',
  mapboxId: 'jcsanford/cj9q6iznv5yfz2rmtig4309qe',
  token: myTokenDontStealPlz
}, {
  id: 7,
  name: 'Dark',
  mapboxId: 'jcsanford/civmqc7m100262imxdnpflcio',
  token: myTokenDontStealPlz
}, {
  id: 8,
  name: 'Pepperoni',
  mapboxId: 'jcsanford/cjc2byrve12jy2smna1ssel35',
  token: myTokenDontStealPlz
}, {
  id: 9,
  name: 'Black Gum',
  mapboxId: 'jcsanford/cjc2c2skxiv4g2snpe4eat6w9',
  token: myTokenDontStealPlz
}, {
  id: 10,
  name: 'Satellite',
  mapboxId: 'jcsanford/cje7wz95k6o182rml2rw1mjw7',
  token: myTokenDontStealPlz
}, {
  id: 11,
  name: 'Topo',
  mapboxId: 'jcsanford/ckk160ban26ik18m8d071oltt',
  token: myTokenDontStealPlz
}];

var Map = function () {
  function Map(opts) {
    _classCallCheck(this, Map);

    this.id = opts.id;
    this.name = opts.name;
    this.mapboxId = opts.mapboxId;
    this.token = opts.token;
  }

  _createClass(Map, [{
    key: 'staticImageUrl',
    value: function staticImageUrl(lng, lat, zoom, width, height) {
      return 'https://api.mapbox.com/styles/v1/' + this.mapboxId + '/static/' + lng + ',' + lat + ',' + zoom + '/' + width + 'x' + height + '@2x?access_token=' + this.token + '&attribution=false&logo=false';
    }
  }, {
    key: '_tileLayerUrl',
    value: function _tileLayerUrl(size) {
      return 'https://api.mapbox.com/styles/v1/' + this.mapboxId + '/tiles/' + size + '/{z}/{x}/{y}@2x?access_token=' + this.token;
    }
  }, {
    key: 'tileLayerUrl',
    get: function get() {
      return this._tileLayerUrl(256);
    }
  }, {
    key: 'tileLayerUrlLarge',
    get: function get() {
      return this._tileLayerUrl(512);
    }
  }], [{
    key: 'byId',
    value: function byId(id) {
      var map = null;

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = mapObjects[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var mapObject = _step.value;

          if (mapObject.id === id) {
            map = mapObject;
            break;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return map;
    }
  }, {
    key: 'random',
    value: function random() {
      // eslint-disable-next-line no-use-before-define
      return mapObjects[Math.floor(Math.random() * mapObjects.length)];
    }
  }, {
    key: 'default',
    value: function _default() {
      // eslint-disable-next-line no-use-before-define
      return mapObjects[0];
    }
  }, {
    key: 'all',
    value: function all() {
      // eslint-disable-next-line no-use-before-define
      return mapObjects;
    }
  }]);

  return Map;
}();

var mapObjects = mapDefs.map(function (mapDef) {
  return new Map(mapDef);
});

exports.default = Map;
