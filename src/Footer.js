import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default class Footer extends Component {
  static propTypes = {
    center: PropTypes.arrayOf(PropTypes.number).isRequired,
    zoom: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    mapId: PropTypes.number.isRequired
  };

  render() {
    const {styles} = Footer;

    let urlRoot = null;

    if (process.env.NODE_ENV === 'production') {
      urlRoot = '/';
    } else {
      urlRoot = 'http://localhost:3001/';
    }

    const href = `${urlRoot}image?width=${this.props.width}&height=${this.props.height}&zoom=${this.props.zoom}&latitude=${this.props.center[0]}&longitude=${this.props.center[1]}&map=${this.props.mapId}`;

    return (
      <div className={styles.footer}>
        {this.renderLogo()}
        <a
          className={cx('Button', styles.link)}
          target="_blank"
          rel="noopener noreferrer"
          href={href}>
          <i
            className={cx('fa', 'fa-download', styles.icon)}
            aria-hidden="true" />
          Get Wallpaper
        </a>
      </div>
    );
  }

  renderLogo() {
    const { styles } = Footer;
    const { mapId } = this.props;

    if (![ 12, 14 ].includes(mapId)) {
      return null;
    }

    const logoPath = {
      12: 'logo-green.png',
      14: 'logo-dark.png'
    }[mapId];

    return (
      <div>
        <img
          className={styles.logo}
          src={logoPath} />
      </div>
    );
  }
}

const styles = cssInJS({
  footer: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    textAlign: 'center',
    padding: 12,
    zIndex: 1000
  },

  logo: {
    width: 150,
    marginBottom: 20
  },

  link: {
    padding: '10px 14px',
    backgroundColor: '#222',
    color: '#e0e0e0',

    ':visited': {
      color: '#e0e0e0',
      textDecoration: 'none'
    }
  },

  icon: {
    marginRight: 8
  }
});

Footer.styles = styles;
