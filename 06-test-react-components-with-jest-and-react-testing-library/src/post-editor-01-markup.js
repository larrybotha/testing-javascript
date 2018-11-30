import React from 'react';

class Editor extends React.Component {
  render() {
    return (
      <form>
        <label htmlFor="title">Title</label>
        <input id="title" />

        <label htmlFor="content">Content</label>
        <textarea id="content" />

        <label htmlFor="tags">Tags</label>
        <input id="tags" />

        <button type="submit">submit</button>
      </form>
    );
  }
}

export {Editor};
