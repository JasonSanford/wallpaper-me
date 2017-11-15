import React, { Component } from 'react';

import Header from './Header';
import Footer from './Footer';
import LayerPicker from './LayerPicker';
import MapContainer from './MapContainer';
import Map from './map';
import Geocoder from './geocoder';

export default class App extends Component {
  constructor() {
    super();

    const initialMap = Map.default();

    this.onMoveend = this.onMoveend.bind(this);
    this.onZoomend = this.onZoomend.bind(this);

    let width = 500;
    let height = 500;
    let sizeDetected = false;
    let retina = false;

    if (window.screen && window.screen.width && window.screen.height) {
      width = window.screen.width;
      height = window.screen.height;
      sizeDetected = true;

      if (window.devicePixelRatio) {
        retina = true;

        width *= window.devicePixelRatio;
        height *= window.devicePixelRatio;
      }
    }

    this.state = {
      originalWidth: width,
      originalHeight: height,
      zoom: 5,
      center: [ 39.7022588, -96.1938807 ],
      mapId: initialMap.id,
      layerPickerVisible: false,
      geocoderVisible: false,
      width,
      height,
      retina,
      sizeDetected
    };
  }

  render() {
    const {styles} = App;

    return (
      <div className={styles.app}>
        <Header
          handleLayerPickerClicked={this.onLayerPickerClicked}
          handleSearchClicked={this.onSearchClicked} />
        <LayerPicker
          show={this.state.layerPickerVisible}
          handleClose={this.onLayerPickerClosed}
          mapCenter={this.state.center}
          mapZoom={this.state.zoom}
          mapId={this.state.mapId}
          handleLayerSelected={this.onLayerSelected} />
        <Geocoder
          show={this.state.geocoderVisible}
          handleClose={this.onGeocoderClosed}
          handleGeocodeSelected={this.onGeocodeSelected} />
        <MapContainer
          mapId={this.state.mapId}
          zoom={this.state.zoom}
          handleMoveend={this.onMoveend}
          handleZoomend={this.onZoomend}
          center={this.state.center} />
        <Footer
          center={this.state.center}
          zoom={this.state.zoom}
          width={this.state.width}
          height={this.state.height}
          mapId={this.state.mapId} />
      </div>
    );
  }

  onLayerPickerClicked = () => {
    this.setState({
      layerPickerVisible: true
    });
  }

  onLayerPickerClosed = () => {
    this.setState({
      layerPickerVisible: false
    });
  }

  onLayerSelected = (mapId) => {
    this.setState({
      mapId: mapId
    });
  }

  onSearchClicked = () => {
    this.setState({
      geocoderVisible: true
    });
  }

  onGeocoderClosed = () => {
    this.setState({
      geocoderVisible: false
    });
  }

  onMoveend = (event) => {
    const latLng = event.target.getCenter();

    this.setState({
      center: [ latLng.lat, latLng.lng ]
    });
  }

  onZoomend = (event) => {
    this.setState({
      zoom: event.target.getZoom()
    });
  }

  onGeocodeSelected = (feature) => {
    const center = [ feature.center[1], feature.center[0] ];
    this.setState({
      center,
      zoom: 10,
      geocoderVisible: false
    });
  }
}

const styles = cssInJS({
  app: {
    position: 'relative',
    height: '100%'
  }
});

App.styles = styles;
