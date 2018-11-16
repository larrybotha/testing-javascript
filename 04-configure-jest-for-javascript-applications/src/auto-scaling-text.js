import React from 'react';
import PropTypes from 'prop-types';

// webpack can be configured to handle imports like images and css, but Jest, by
// default, knows nothing about these files, and attempts to import them as Node
// modules.
// In order for our tests not to throw errors on on these kinds of imports, we
// need to use the moduleNameMapper property in jest.config.js to provide Jest
// with an import it can handle.
import styles from './auto-scaling-text.module.css';

class AutoScalingText extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  };
  node = React.createRef();
  getScale() {
    const node = this.node.current;
    if (!node) {
      // comment for commit
      return 1;
    }
    const parentNode = node.parentNode;

    const availableWidth = parentNode.offsetWidth;
    const actualWidth = node.offsetWidth;
    const actualScale = availableWidth / actualWidth;

    if (actualScale < 1) {
      return actualScale * 0.9;
    }
    return 1;
  }

  render() {
    const scale = this.getScale();

    return (
      <div
        className={styles.autoScalingText}
        style={{transform: `scale(${scale},${scale})`}}
        ref={this.node}>
        {this.props.children}
      </div>
    );
  }
}

export default AutoScalingText;
