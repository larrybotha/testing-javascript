import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';

import React from 'react';
import {render, fireEvent, wait, waitForElement} from 'react-testing-library';
import {savePost as mockSavePost} from '../src/api';
import {Redirect as MockRedirect} from 'react-router-dom';
import {build, fake, sequence} from 'test-data-bot';

import {Editor} from '../src/post-editor-07-markup';

jest.mock('../src/api', () => ({
  savePost: jest.fn(subject => Promise.resolve({ok: true})),
}));

jest.mock('react-router-dom', () => ({
  Redirect: jest.fn(() => null),
}));

afterEach(() => {
  MockRedirect.mockClear();
  mockSavePost.mockClear();
});

const userBuilder = build('User').fields({
  id: sequence(x => `user-${x}`),
});
const postBuilder = build('Post').fields({
  content: fake(f => f.lorem.paragraphs().replace(/\r/g, '')),
  tags: fake(f => f.lorem.words(3).split(' ')),
  title: fake(f => f.lorem.sentence()),
});

describe('Editor', () => {
  test('renders with correct fields and submit button', async () => {
    const preDate = Date.now();
    const fakeUser = userBuilder();
    const payload = postBuilder();
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
      date: expect.any(String),
    });

    const postDate = Date.now();
    const date = new Date(mockSavePost.mock.calls[0][0].date).getTime();

    expect(date).toBeGreaterThan(preDate);
    expect(date).toBeLessThan(postDate);

    await wait(() => {
      expect(MockRedirect).toHaveBeenCalledTimes(1);
    });

    expect(MockRedirect).toHaveBeenCalledWith({to: '/'}, {});
  });

  test('renders an error when API rejects the request', async () => {
    const error = 'test error';
    // make mockSavePost reject once, and provide it with a value we can assert
    // exists in the UI
    mockSavePost.mockRejectedValueOnce({ok: false, message: error});
    const fakeUser = userBuilder();
    const payload = postBuilder();
    const {container, getByLabelText, getByText, getByTestId} = render(
      <Editor user={fakeUser} />
    );

    const contentInput = getByLabelText(/content/i);
    const tagsInput = getByLabelText(/tags/i);
    const titleInput = getByLabelText(/title/i);

    contentInput.value = payload.content;
    tagsInput.value = payload.tags.join(', ');
    titleInput.value = payload.title;

    const button = getByText(/submit/i);

    fireEvent.click(button);

    // Our element will only show after the promise is rejected.
    // In order to get the element at a later point in time, we need to use
    // waitForElement
    const postErrorEl = await waitForElement(() => getByTestId('post-error'));

    expect(postErrorEl).toHaveTextContent(error);
    expect(button).not.toBeDisabled();
  });
});
