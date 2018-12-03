import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';

import React from 'react';
import {render, fireEvent, wait, waitForElement} from 'react-testing-library';
import {savePost as mockSavePost} from '../src/api';
import {Redirect as MockRedirect} from 'react-router-dom';
import {build, fake, sequence} from 'test-data-bot';

import {Editor} from '../src/post-editor-08-markup';

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

const renderEditor = () => {
  const preDate = Date.now();
  const fakeUser = userBuilder();
  const payload = postBuilder();
  const utils = render(<Editor user={fakeUser} />);

  const titleInput = utils.getByLabelText(/title/i);
  const contentInput = utils.getByLabelText(/content/i);
  const tagsInput = utils.getByLabelText(/tags/i);
  const submitButton = utils.getByText(/submit/i);

  titleInput.value = payload.title;
  contentInput.value = payload.content;
  tagsInput.value = payload.tags.join(', ');

  return {
    ...utils,
    preDate,
    fakeUser,
    payload,
    submitButton,
  };
};

describe('Editor', () => {
  test('renders with correct fields and submit button', async () => {
    const {
      getByText,
      payload,
      preDate,
      fakeUser,
      submitButton,
    } = renderEditor();

    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();

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
    mockSavePost.mockRejectedValueOnce({ok: false, message: error});

    const {getByText, getByTestId, submitButton} = renderEditor();

    fireEvent.click(submitButton);

    const postErrorEl = await waitForElement(() => getByTestId('post-error'));

    expect(postErrorEl).toHaveTextContent(error);
    expect(submitButton).not.toBeDisabled();
  });
});
