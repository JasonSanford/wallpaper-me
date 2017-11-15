import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MapboxClient from 'mapbox';
import debounce from 'debounce';
import cx from 'classnames';
import { Modal } from 'react-overlays';

import GeocodeResult from './GeocodeResult';

export default class Geocoder extends Component {
  static propTypes = {
    show: PropTypes.bool,
    handleClose: PropTypes.func.isRequired,
    handleGeocodeSelected: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.mapboxClient = new MapboxClient('pk.eyJ1IjoiamNzYW5mb3JkIiwiYSI6InRJMHZPZFUifQ.F4DMGoNgU3r2AWLY0Eni-w');

    this.geocode = debounce(this.geocode, 350);

    this.state = {
      searchValue: null,
      geocodeResults: null
    };
  }

  render() {
    const {styles} = Geocoder;

    return (
      <Modal
        backdropClassName="ModalBackdrop"
        show={this.props.show}
        onHide={this.props.handleClose}
        className="Modal">
        <div className={cx('ModalDialog', styles.geocoder)}>
          <div>
            <input
              autoFocus
              className={styles.textInput}
              type="text"
              placeholder="city, address, etc."
              onChange={this.handleTextInputChange} />
          </div>
          {this.renderGeocodeResults()}
        </div>
      </Modal>
    );
  }

  renderGeocodeResults() {
    const {styles} = Geocoder;

    if (!this.state.geocodeResults) {
      return null;
    }

    return (
      <div className={styles.geocodeResults}>
        {this.state.geocodeResults.map((geocodeResult, i) => {
          const last = (i === (this.state.geocodeResults.length - 1));

          return (
            <GeocodeResult
              key={geocodeResult.id}
              feature={geocodeResult}
              last={last}
              onGeocodeSelected={this.handleGeocodeSelected} />
          );
        })}
      </div>
    );
  }

  handleTextInputChange = (event) => {
    this.setState({
      searchValue: event.target.value
    }, this.geocode);
  }

  geocode() {
    this.mapboxClient.geocodeForward(this.state.searchValue, (error, data, res) => {
      if (error) {
        return;
      }

      let geocodeResults = null;

      if (data.features.length > 0) {
        geocodeResults = data.features.slice(0, 10);
      }

      this.setState({geocodeResults});
    });
  }

  handleGeocodeSelected = (feature) => {
    this.setState({searchValue: null, geocodeResults: null});
    this.props.handleGeocodeSelected(feature);
  }
}

const styles = cssInJS({
  geocoder: {
    width: 400,
    height: 'unset'
  },

  icon: {
    color: '#222',
    fontSize: '1.5em',
    cursor: 'pointer'
  },

  textInput: {
    padding: 2,
    width: '100%',
    boxSizing: 'border-box',
    fontSize: '1.1em'
  },

  searchCloseButton: {
    color: '#222'
  },

  geocodeResults: {
    marginTop: 20
  }
});

Geocoder.styles = styles;
