import 'jest-dom/extend-expect';
import React from 'react';
import ReactDOM from 'react-dom';
// import {getQueriesForElement} from 'dom-testing-library';
import {render} from 'react-testing-library';

import {FavoriteNumber} from '../src/favorite-number';

// we can abstract the rendering to its own function, and export all the queries
// here so that we can benefit from the rendering and querying in all
// components.
// Turns out that this is exactly what reac-testing-library does
// const render = ui => {
//   const container = document.createElement('div');

//   ReactDOM.render(ui, container);

//   const queries = getQueriesForElement(container);

//   return {
//     container,
//     ...queries,
//   };
// };

describe('FavoriteNumber', () => {
  test('renders a number input with a label "Favorite Number"', () => {
    const {container, getByLabelText} = render(<FavoriteNumber />);
    const input = getByLabelText(/favorite number/i);

    expect(input).toHaveAttribute('type', 'number');
  });
});
