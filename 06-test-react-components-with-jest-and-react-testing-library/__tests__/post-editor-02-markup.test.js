import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';

import React from 'react';
import {render, fireEvent} from 'react-testing-library';

import {Editor} from '../src/post-editor-02-markup';

describe('Editor', () => {
  test('renders with correct fields and submit button', () => {
    const {container, getByLabelText, getByText} = render(<Editor />);

    getByLabelText(/title/i);
    getByLabelText(/content/i);
    getByLabelText(/tags/i);

    const button = getByText(/submit/i);

    fireEvent.click(button);

    expect(button).toBeDisabled();
  });
});
