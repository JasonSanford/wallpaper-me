import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MapboxClient from 'mapbox';
import debounce from 'debounce';
import cx from 'classnames';
import { Modal } from 'react-overlays';

import GeocodeResult from './GeocodeResult';

const KEY_UP = 38;
const KEY_DOWN = 40;
const KEY_ENTER = 13;

export default class Geocoder extends Component {
  static propTypes = {
    show: PropTypes.bool,
    handleClose: PropTypes.func.isRequired,
    handleGeocodeSelected: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.mapboxClient = new MapboxClient('pk.eyJ1IjoiamNzYW5mb3JkIiwiYSI6ImNrZG1kdnU5NzE3bG4yenBkbzU5bDQ2NXMifQ.IMquilPKSANQDaSzf3fjcg');

    this.geocode = debounce(this.geocode, 350);

    this.state = {
      searchValue: null,
      geocodeResults: null,
      highlightedResult: null
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
              onChange={this.handleTextInputChange}
              onKeyDown={this.handleKeyDown} />
          </div>
          {this.renderGeocodeResults()}
        </div>
      </Modal>
    );
  }

  renderGeocodeResults() {
    const {styles} = Geocoder;
    const {geocodeResults, highlightedResult} = this.state;

    if (!geocodeResults) {
      return null;
    }

    return (
      <div className={styles.geocodeResults}>
        {geocodeResults.map((geocodeResult, i) => {
          const last = (i === (geocodeResults.length - 1));
          const highlighted = (i === highlightedResult);

          return (
            <GeocodeResult
              key={geocodeResult.id}
              feature={geocodeResult}
              last={last}
              highlighted={highlighted}
              onGeocodeSelected={this.handleGeocodeSelected} />
          );
        })}
      </div>
    );
  }

  handleTextInputChange = (event) => {
    const value = event.target.value.length > 0
      ? event.target.value
      : null;

    const state = {searchValue: value};

    if (!value) {
      state.geocodeResults = null;
      state.highlightedResult = null;
    }

    this.setState(state, this.geocode);
  }

  handleKeyDown = (event) => {
    const isUp = event.keyCode === KEY_UP;
    const isDown = event.keyCode === KEY_DOWN;
    const isEnter = event.keyCode === KEY_ENTER;
    let {highlightedResult} = this.state;
    const {geocodeResults} = this.state;

    if (!(isUp || isDown || isEnter)) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    if (isEnter) {
      if (highlightedResult !== null) {
        this.handleGeocodeSelected(geocodeResults[highlightedResult]);
      }
      return;
    }

    if (highlightedResult === null) {
      if (isUp) {
        highlightedResult = geocodeResults.length - 1;
      } else {
        highlightedResult = 0;
      }
    } else {
      const firstResultHighlighted = highlightedResult === 0;
      const lastResultHighlighted = (highlightedResult === geocodeResults.length - 1);

      if (isUp) {
        if (firstResultHighlighted) {
          highlightedResult = geocodeResults.length - 1;
        } else {
          highlightedResult--;
        }
      } else if (lastResultHighlighted) {
        highlightedResult = 0;
      } else {
        highlightedResult++;
      }
    }

    this.setState({highlightedResult});
  }

  geocode() {
    if (!this.state.searchValue) {
      return;
    }

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
    this.setState({searchValue: null, geocodeResults: null, highlightedResult: null});
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
