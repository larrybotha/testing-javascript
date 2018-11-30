import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';

import React from 'react';
import {render} from 'react-testing-library';

import {Editor} from '../src/post-editor-01-markup';

describe('Editor', () => {
  test('renders with correct fields and submit button', () => {
    const {container, getByLabelText, getByText} = render(<Editor />);

    getByLabelText(/title/i);
    getByLabelText(/content/i);
    getByLabelText(/tags/i);
    getByText(/submit/i);
  });
});
