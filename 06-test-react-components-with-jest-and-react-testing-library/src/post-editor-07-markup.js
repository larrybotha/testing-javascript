import React from 'react';
import {Redirect} from 'react-router-dom';

import {savePost} from './api';

const uiStates = {
  idle: 'idle',
  requesting: 'requesting',
  success: 'success',
  error: 'error',
};

class Editor extends React.Component {
  state = {uiState: uiStates.idle, error: null};

  handleSubmit = async e => {
    e.preventDefault();

    const {user} = this.props;
    const {content, tags, title} = e.target.elements;
    const newPost = {
      authorId: user.id,
      content: content.value,
      date: new Date().toISOString(),
      tags: tags.value.split(',').map(t => t.trim()),
      title: title.value,
    };

    this.setState({uiState: uiStates.requesting});

    await savePost(newPost)
      .then(res => {
        if (res.ok) {
          this.setState({uiState: uiStates.success});
        } else {
          this.setState({uiState: uiStates.error, error: res});
        }
      })
      .catch(e => {
        this.setState({uiState: uiStates.error, error: e});
      });
  };

  render() {
    const {error, uiState} = this.state;

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

        {uiState === uiStates.error ? (
          <div data-testid="post-error">error: {error.message}</div>
        ) : null}
      </form>
    );
  }
}

export {Editor};
