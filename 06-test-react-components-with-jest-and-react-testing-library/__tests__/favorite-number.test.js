import 'jest-dom/extend-expect';
import React from 'react';
import ReactDOM from 'react-dom';
import {render, cleanup} from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';

import {FavoriteNumber} from '../src/favorite-number';

describe('FavoriteNumber', () => {
  test('renders a number input with a label "Favorite Number"', () => {
    const {debug, getByLabelText} = render(<FavoriteNumber />);
    const input = getByLabelText(/favorite number/i);

    // print out the entire rendered output
    debug();

    expect(input).toHaveAttribute('type', 'number');

    // print out only the input
    debug(input);
  });
});
