import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default class GeocodeResult extends Component {
  static propTypes = {
    feature: PropTypes.object.isRequired,
    last: PropTypes.bool.isRequired,
    onGeocodeSelected: PropTypes.func.isRequired
  }

  render() {
    const {styles} = GeocodeResult;

    const geocodeResultStyles = {};
    geocodeResultStyles[`${styles.last}`] = this.props.last;

    return (
      <div
        onClick={this.handleGeocodeSelected}
        className={cx(styles.geocodeResult, geocodeResultStyles)}>
        {this.props.feature.place_name}
      </div>
    );
  }

  handleGeocodeSelected = () => {
    this.props.onGeocodeSelected(this.props.feature);
  }
}

const styles = cssInJS({
  geocodeResult: {
    cursor: 'pointer',
    padding: '6px 2px',
    borderBottom: '1px solid #e0e0e0',

    ':hover': {
      background: '#e9e9e9'
    }
  },

  last: {
    marginBottom: 0
  }
});

GeocodeResult.styles = styles;
