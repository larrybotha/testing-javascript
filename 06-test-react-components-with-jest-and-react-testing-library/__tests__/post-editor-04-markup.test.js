import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';

import React from 'react';
import {render, fireEvent, wait} from 'react-testing-library';
import {savePost as mockSavePost} from '../src/api';
// import Redirect from react-router-dom so we can assert on it
import {Redirect as MockRedirect} from 'react-router-dom';

import {Editor} from '../src/post-editor-04-markup';

jest.mock('../src/api', () => ({
  savePost: jest.fn(subject => Promise.resolve({success: true})),
}));

// mock out Redirect so that we can assert on it
jest.mock('react-router-dom', () => ({
  Redirect: jest.fn(() => null),
}));

afterEach(() => {
  // clear the redirect after each test
  MockRedirect.mockClear();
  mockSavePost.mockClear();
});

describe('Editor', () => {
  // make our test async because we need to wait for a promise to resolve inside
  // the submit handler
  test('renders with correct fields and submit button', async () => {
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

    await wait(() => {
      // Assert that our mocked redirect call actually happened
      // Each call inside wait increases the time tests take to run, because
      // wait will keep executing every 15ms for 4s until either the test passes
      // or fails for each assertion inside the callback
      // The more tests you have inside `wait` the longer you will have to wait
      // for tests to fail if any of them fail
      expect(MockRedirect).toHaveBeenCalledTimes(1);

      // This failing test will result in this callback holding up feedback in
      // Jest for 8s
      // expect(MockRedirect).toHaveBeenCalledTimes(2);
    });

    // assert that our redirect was called with the correct path for redirection
    expect(MockRedirect).toHaveBeenCalledWith({to: '/'}, {});
  });
});
