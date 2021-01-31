import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Map from './map';

export default class MapCard extends Component {
  static propTypes = {
    map: PropTypes.instanceOf(Map).isRequired,
    selected: PropTypes.bool,
    lastInRow: PropTypes.bool,
    onLayerSelected: PropTypes.func.isRequired,
    mapCenter: PropTypes.arrayOf(PropTypes.number).isRequired,
    mapZoom: PropTypes.number.isRequired
  }

  defaultProps = {
    selected: false,
    lastInRow: false
  }

  render() {
    const {styles} = MapCard;

    const containerClasses = {};
    containerClasses[`${styles.selected}`] = this.props.selected;
    containerClasses[`${styles.lastInRow}`] = this.props.lastInRow;
    const containerClassName = cx(styles.mapCard, containerClasses);

    const mapImageClasses = {};
    mapImageClasses[`${styles.mapImageSelected}`] = this.props.selected;
    const mapImageClassName = cx(styles.mapImage, mapImageClasses);

    const imageUrl = this.props.map.staticImageUrl(this.props.mapCenter[1], this.props.mapCenter[0], this.props.mapZoom, 360, 125);

    return (
      <div
        className={containerClassName}
        onClick={this.handleClick}>
        <div
          className={mapImageClassName}
          style={{ backgroundImage: `url(${imageUrl})` }}>
          {this.renderLogo()}
        </div>
        <span className={styles.mapName}>
          {this.props.map.name}
        </span>
      </div>
    );
  }

  renderLogo() {
    const { map } = this.props;
    const { styles } = MapCard;

    if (![ 12, 14 ].includes(map.id)) {
      return null;
    }

    const logoPath = {
      12: 'logo-green.png',
      14: 'logo-dark.png'
    }[map.id];

    return (
      <img
        src={logoPath}
        className={styles.logo} />
    );
  }

  handleClick = () => {
    this.props.onLayerSelected(this.props.map.id);
  }
}

const styles = cssInJS({
  mapCard: {
    marginBottom: 15,
    cursor: 'pointer',
    padding: 5,
    borderRadius: 5,
    transition: 'background-color 0.2s, box-shadow 0.2s',
    backgroundColor: '#e0e0e0',
    border: '1px solid #b3b3b3',
    boxSizing: 'border-box',

    ':hover': {
      backgroundColor: '#c9c9c9'
    }
  },

  selected: {
    backgroundColor: '#b8dbf8 !important',
    boxShadow: '3px 3px 3px #999',
    border: 'none'
  },

  mapImage: {
    backgroundColor: 'white',
    height: 125,
    borderRadius: 3,
    backgroundSize: 'cover',
    border: '1px solid #b3b3b3',
    position: 'relative'
  },

  mapImageSelected: {
    border: '1px solid #777'
  },

  mapName: {
    width: '100%',
    display: 'block',
    marginTop: 5,
    textAlign: 'center',
    padding: '4px 0'
  },

  logo: {
    width: 50,
    position: 'absolute',
    bottom: 5,
    left: 118
  },

  '@media (min-width: 550px)': {
    mapCard: {
      marginRight: 10,
      width: 192,
      display: 'inline-block'
    },

    logo: {
      width: 50,
      position: 'absolute',
      bottom: 5,
      left: 65
    },

    lastInRow: {
      marginRight: 0
    }
  }
});

MapCard.styles = styles;
