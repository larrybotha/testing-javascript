import React from 'react';
import ReactDOM from 'react-dom';

import {FavoriteNumber} from '../src/favorite-number';

describe('FavoriteNumber', () => {
  test('renders a number input with a label "Favorite Number"', () => {
    const div = document.createElement('div');

    ReactDOM.render(<FavoriteNumber />, div);

    expect(div.querySelector('input').type).toBe('number');
    expect(div.querySelector('label').textContent).toBe('Favorite Number');
  });
});
