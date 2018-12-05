import React from 'react';

class Toggle extends React.Component {
  state = {on: false};

  toggle = () => this.setState(({on}) => ({on: !on}));

  render() {
    const {on} = this.state;
    const {children} = this.props;

    return children({on, toggle: this.toggle});
  }
}

export {Toggle};
