import 'jest-dom/extend-expect';
import React from 'react';
import ReactDOM from 'react-dom';
import {render, cleanup} from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';

import {FavoriteNumber} from '../src/favorite-number';

describe('FavoriteNumber', () => {
  test('renders a number input with a label "Favorite Number"', () => {
    const {getByLabelText} = render(<FavoriteNumber />);
    const input = getByLabelText(/favorite number/i);

    console.log(document.body.outerHTML);

    expect(input).toHaveAttribute('type', 'number');
  });
});
