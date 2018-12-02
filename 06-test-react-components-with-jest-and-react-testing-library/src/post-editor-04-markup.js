import React from 'react';
import {Redirect} from 'react-router-dom';

import {savePost} from './api';

const uiStates = {
  idle: 'idle',
  requesting: 'requesting',
  success: 'success',
};

class Editor extends React.Component {
  state = {uiState: uiStates.idle};

  handleSubmit = async e => {
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

    await savePost(newPost).then(() => {});

    this.setState({uiState: uiStates.success});
  };

  render() {
    const {uiState} = this.state;

    return uiState === uiStates.success ? (
      <Redirect to="/" />
    ) : (
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
