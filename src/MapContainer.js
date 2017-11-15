import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map, TileLayer } from 'react-leaflet';

import TileMap from './map';

export default class MapContainer extends Component {
  static propTypes = {
    center: PropTypes.arrayOf(PropTypes.number).isRequired,
    zoom: PropTypes.number.isRequired,
    mapId: PropTypes.number.isRequired,
    handleMoveend: PropTypes.func.isRequired,
    handleZoomend: PropTypes.func.isRequired
  }

  render() {
    const map = TileMap.byId(this.props.mapId);
    const {styles} = MapContainer;

    return (
      <div className={styles.mapContainer}>
        <Map
          className={styles.map}
          center={this.props.center}
          zoom={this.props.zoom}
          zoomControl={false}
          attributionControl={false}
          onMoveend={this.props.handleMoveend}
          onZoomend={this.props.handleZoomend}>
          <TileLayer
            url={map.tileLayerUrl}
            attribution='© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>' />
        </Map>
      </div>
    );
  }
}

const styles = cssInJS({
  mapContainer: {
    height: '100%'
  },

  map: {
    height: '100%'
  }

});

MapContainer.styles = styles;
