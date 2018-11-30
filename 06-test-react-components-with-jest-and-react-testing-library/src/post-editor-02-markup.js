import React from 'react';

const uiStates = {
  idle: 'idle',
  requesting: 'requesting',
};

class Editor extends React.Component {
  state = {uiState: uiStates.idle};

  handleSubmit = e => {
    e.preventDefault();

    this.setState({uiState: uiStates.requesting});
  };

  render() {
    const {uiState} = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="title">Title</label>
        <input id="title" />

        <label htmlFor="content">Content</label>
        <textarea id="content" />

        <label htmlFor="tags">Tags</label>
        <input id="tags" />

        <button disabled={uiState === uiStates.requesting} type="submit">
          submit
        </button>
      </form>
    );
  }
}

export {Editor};
