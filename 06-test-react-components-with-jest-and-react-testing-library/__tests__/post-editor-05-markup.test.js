import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';

import React from 'react';
import {render, fireEvent, wait} from 'react-testing-library';
import {savePost as mockSavePost} from '../src/api';
import {Redirect as MockRedirect} from 'react-router-dom';

import {Editor} from '../src/post-editor-05-markup';

jest.mock('../src/api', () => ({
  savePost: jest.fn(subject => Promise.resolve({success: true})),
}));

jest.mock('react-router-dom', () => ({
  Redirect: jest.fn(() => null),
}));

afterEach(() => {
  MockRedirect.mockClear();
  mockSavePost.mockClear();
});

// set a date we can evaluate the post's date to be greater than
const preDate = Date.now();

describe('Editor', () => {
  test('renders with correct fields and submit button', async () => {
    const fakeUser = {id: 'user-1'};
    const payload = {
      content: 'foobar',
      date: expect.any(String),
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

    // get a date after the post was created so that we can assert the posts's
    // date is less than this date
    const postDate = Date.now();
    // get the actual date created in the submit handler
    const date = new Date(mockSavePost.mock.calls[0][0].date).getTime();

    // assert that the post's date is between the dates in the test
    expect(date).toBeGreaterThan(preDate);
    expect(date).toBeLessThan(postDate);

    await wait(() => {
      expect(MockRedirect).toHaveBeenCalledTimes(1);
    });

    expect(MockRedirect).toHaveBeenCalledWith({to: '/'}, {});
  });
});
