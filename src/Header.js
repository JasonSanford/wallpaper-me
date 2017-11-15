import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default class Header extends Component {
  static propTypes = {
    handleSearchClicked: PropTypes.func.isRequired,
    handleLayerPickerClicked: PropTypes.func.isRequired
  }

  render() {
    const {styles} = Header;

    return (
      <div className={styles.header}>
        <i
          className={cx('fa', 'fa-search', styles.icon, styles.searchIcon)}
          aria-hidden="true"
          onClick={this.props.handleSearchClicked} />
        <h2 className={styles.h2}>Wallpaper Me</h2>
        <i
          className={cx('fa', 'fa-map', styles.icon, styles.mapLayersIcon)}
          aria-hidden="true"
          onClick={this.props.handleLayerPickerClicked} />
      </div>
    );
  }
}

const styles = cssInJS({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    textAlign: 'center',
    background: 'rgba(120, 120, 120, 0.7)',
    padding: 12,
    zIndex: 1001,
    margin: '0 auto'
  },

  h2: {
    fontFamily: 'Bungee Inline',
    color: '#222',
    display: 'inline'
  },

  icon: {
    color: '#222',
    fontSize: '1.5em',
    cursor: 'pointer'
  },

  searchIcon: {
    float: 'left'
  },

  mapLayersIcon: {
    float: 'right'
  }
});

Header.styles = styles;
