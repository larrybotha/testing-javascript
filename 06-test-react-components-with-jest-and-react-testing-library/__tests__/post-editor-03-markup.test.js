import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';

import React from 'react';
import {render, fireEvent} from 'react-testing-library';
// import our api call so that we can assert on it
import {savePost as mockSavePost} from '../src/api';

import {Editor} from '../src/post-editor-03-markup';

// mock out our api call
jest.mock('../src/api', () => ({
  savePost: jest.fn(subject => Promise.resolve({success: true})),
}));

// clear our mock after each test so that subsequent calls don't interfere in
// other tests
afterEach(() => {
  mockSavePost.mockClear();
});

describe('Editor', () => {
  test('renders with correct fields and submit button', () => {
    const fakeUser = {id: 'user-1'};
    const payload = {
      content: 'foobar',
      tags: ['tag1', 'tag2'],
      title: 'foo',
    };
    const {container, getByLabelText, getByText} = render(
      <Editor user={fakeUser} />
    );

    const titleInput = getByLabelText(/title/i);
    const contentInput = getByLabelText(/content/i);
    const tagsInput = getByLabelText(/tags/i);

    titleInput.value = payload.title;
    contentInput.value = payload.content;
    tagsInput.value = payload.tags.join(', ');

    const button = getByText(/submit/i);

    fireEvent.click(button);

    expect(button).toBeDisabled();

    expect(mockSavePost).toHaveBeenCalledTimes(1);
    expect(mockSavePost).toHaveBeenCalledWith({
      ...payload,
      authorId: fakeUser.id,
    });
  });
});
