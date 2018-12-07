import React from 'react';

class Counter extends React.Component {
  state = {count: 0};

  increment = () => this.setState(({count}) => ({count: count + 1}));

  render() {
    return (
      <div>
        <button onClick={this.increment}>{this.state.count}</button>
      </div>
    );
  }
}

export {Counter};
