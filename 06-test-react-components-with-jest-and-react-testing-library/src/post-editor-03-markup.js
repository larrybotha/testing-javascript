import React from 'react';

import {savePost} from './api';

const uiStates = {
  idle: 'idle',
  requesting: 'requesting',
};

class Editor extends React.Component {
  state = {uiState: uiStates.idle};

  handleSubmit = e => {
    e.preventDefault();

    const {user} = this.props;
    // get the form elements via their name attributes
    const {content, tags, title} = e.target.elements;
    const newPost = {
      authorId: user.id,
      content: content.value,
      tags: tags.value.split(',').map(t => t.trim()),
      title: title.value,
    };

    this.setState({uiState: uiStates.requesting});

    savePost(newPost);
  };

  render() {
    const {uiState} = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="title">Title</label>
        <input name="title" id="title" />

        <label htmlFor="content">Content</label>
        <textarea name="content" id="content" />

        <label htmlFor="tags">Tags</label>
        <input name="tags" id="tags" />

        <button disabled={uiState === uiStates.requesting} type="submit">
          submit
        </button>
      </form>
    );
  }
}

export {Editor};
