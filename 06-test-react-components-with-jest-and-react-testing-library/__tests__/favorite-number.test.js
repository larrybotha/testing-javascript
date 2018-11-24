// we can import specific matchers to make assertions easier
// import {toHaveAttribute, toHaveTextContent} from 'jest-dom';
import 'jest-dom/extend-expect';
import React from 'react';
import ReactDOM from 'react-dom';

import {FavoriteNumber} from '../src/favorite-number';

// you can manually extend expect if choosing not to use the import which
// automatically extends expect
// expect.extend({toHaveAttribute, toHaveTextContent});

describe('FavoriteNumber', () => {
  test('renders a number input with a label "Favorite Number"', () => {
    const div = document.createElement('div');

    ReactDOM.render(<FavoriteNumber />, div);

    // instead of checking these properties ourselves, we can mitigate issues,
    // such as typos, by offloading the heavy lifting to jest-dom
    // expect(div.querySelector('input').type).toBe('number');
    // expect(div.querySelector('label').textContent).toBe('Favorite Number');

    // use the matchers we've extends expect with
    expect(div.querySelector('input')).toHaveAttribute('type', 'number');
    expect(div.querySelector('label')).toHaveTextContent('Favorite Number');
  });
});
