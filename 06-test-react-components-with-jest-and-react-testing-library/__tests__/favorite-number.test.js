import React from 'react';
import ReactDOM from 'react-dom';

import {FavoriteNumber} from '../src/favorite-number';

describe('FavoriteNumber', () => {
  test('renders a number input with a label "Favourite Number"', () => {
    const div = document.createElement('div');

    ReactDOM.render(<FavoriteNumber />, div);
  });
});
