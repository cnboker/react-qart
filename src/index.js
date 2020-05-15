import React, { Component } from 'react';
import QArt from 'qartjs';
import PropTypes from 'prop-types'

let getDOMNode;
const version = React.version.split(/[.-]/);
if (version[0] === '0' && (version[1] === '13' || version[1] === '12')) {
  getDOMNode = ref => ref.getDOMNode();
} else {
  getDOMNode = ref => ref;
}


class Qart extends Component {

  componentDidMount() {
    this.update();
  }

  shouldComponentUpdate(nextProps) {
    return Object.keys(Qart.propTypes).some(k => this.props[k] !== nextProps[k]);
  }

  componentDidUpdate() {
    this.update();
  }

  update() {
    const qart = new QArt({
      value: this.props.value,
      imagePath: this.props.imagePath,
      filter: this.props.filter,
    });
    qart.make(this.renderElement);
  }

  render() {
    return (
      <div
        ref={(e) => {
          if (e) {
            this.renderElement = getDOMNode(e);
          }
        }}
      />
    );
  }
}

Qart.defaultProps = {
  filter: 'threshold',
};

Qart.propTypes = {
  value: PropTypes.string.isRequired,
  imagePath: PropTypes.string.isRequired,
  filter: PropTypes.string,
  style: PropTypes.object,
};

export default Qart;
