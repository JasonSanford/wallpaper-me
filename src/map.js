const myTokenDontStealPlz = 'pk.eyJ1IjoiamNzYW5mb3JkIiwiYSI6InRJMHZPZFUifQ.F4DMGoNgU3r2AWLY0Eni-w';

const mapDefs = [
  {
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
  }
];

class Map {
  constructor(opts) {
    this.id = opts.id;
    this.name = opts.name;
    this.mapboxId = opts.mapboxId;
    this.token = opts.token;
  }

  static byId(id) {
    let map = null;

    for (const mapObject of mapObjects) {
      if (mapObject.id === id) {
        map = mapObject;
        break;
      }
    }

    return map;
  }

  static random() {
    // eslint-disable-next-line no-use-before-define
    return mapObjects[Math.floor(Math.random() * mapObjects.length)];
  }

  static default() {
    // eslint-disable-next-line no-use-before-define
    return mapObjects[0];
  }

  static all() {
    // eslint-disable-next-line no-use-before-define
    return mapObjects;
  }

  get tileLayerUrl() {
    return this._tileLayerUrl(256);
  }

  get tileLayerUrlLarge() {
    return this._tileLayerUrl(512);
  }

  staticImageUrl(lng, lat, zoom, width, height) {
    return `https://api.mapbox.com/styles/v1/${this.mapboxId}/static/${lng},${lat},${zoom}/${width}x${height}@2x?access_token=${this.token}&attribution=false&logo=false`;
  }

  _tileLayerUrl(size) {
    return `https://api.mapbox.com/styles/v1/${this.mapboxId}/tiles/${size}/{z}/{x}/{y}@2x?access_token=${this.token}`;
  }
}

const mapObjects = mapDefs.map((mapDef) => {
  return new Map(mapDef);
});

export default Map;
