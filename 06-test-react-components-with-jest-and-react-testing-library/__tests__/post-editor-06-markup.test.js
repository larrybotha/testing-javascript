import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';

import React from 'react';
import {render, fireEvent, wait} from 'react-testing-library';
import {savePost as mockSavePost} from '../src/api';
import {Redirect as MockRedirect} from 'react-router-dom';
import {build, fake, sequence} from 'test-data-bot';

import {Editor} from '../src/post-editor-06-markup';

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

const preDate = Date.now();
const userBuilder = build('User').fields({
  id: sequence(x => `user-${x}`),
});
const postBuilder = build('Post').fields({
  // 2 newline characters in a textarea will be replaced with 1
  content: fake(f => f.lorem.paragraphs().replace(/\r/g, '')),
  tags: fake(f => f.lorem.words(3).split(' ')),
  title: fake(f => f.lorem.sentence()),
});

describe('Editor', () => {
  test('renders with correct fields and submit button', async () => {
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
});
