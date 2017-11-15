import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-overlays';
import cx from 'classnames';

import Map from './map';
import MapCard from './MapCard';

export default class LayerPicker extends Component {
  static propTypes = {
    mapCenter: PropTypes.arrayOf(PropTypes.number).isRequired,
    mapZoom: PropTypes.number.isRequired,
    show: PropTypes.bool,
    mapId: PropTypes.number.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleLayerSelected: PropTypes.func.isRequired
  }

  static defaultProps = {
    show: false
  }

  constructor(props) {
    super(props);

    this.maps = Map.all();
  }

  render() {
    const {styles} = LayerPicker;

    return (
      <Modal
        backdropClassName="ModalBackdrop"
        show={this.props.show}
        onHide={this.props.handleClose}
        className="Modal">
        <div className={cx(styles.modal, 'ModalDialog')}>
          <div className={styles.layers}>
            {this.renderMaps()}
          </div>
          <div className={cx(styles.bottom, 'Bottom')}>
            <button
              className="Button"
              onClick={this.props.handleClose}>
              <i className="fa fa-hand-peace-o" />
              Done!
            </button>
          </div>
        </div>
      </Modal>
    );
  }

  renderMaps() {
    const maps = this.maps.slice(0);
    const mapGroups = [];

    while (maps.length > 0) {
      mapGroups.push(maps.splice(0, 3));
    }

    mapGroups.forEach((mapGroup) => {
      mapGroup.forEach((map, i) => {
        const selected = this.props.mapId === map.id;
        const lastInRow = i === 2;

        maps.push(
          <MapCard
            map={map}
            key={map.id}
            selected={selected}
            lastInRow={lastInRow}
            onLayerSelected={this.props.handleLayerSelected}
            mapCenter={this.props.mapCenter}
            mapZoom={this.props.mapZoom} />
        );
      });
    });

    return maps;
  }
}

const styles = cssInJS({
  modal: {
    height: 'unset',
    paddingBottom: 60
  },

  layers: {
    height: 300,
    overflowY: 'auto'
  },

  bottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginTop: 0,
    padding: 15,
    backgroundColor: '#fff'
  }
});

LayerPicker.styles = styles;
