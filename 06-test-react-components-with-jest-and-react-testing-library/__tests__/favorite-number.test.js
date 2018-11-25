import 'jest-dom/extend-expect';
import React from 'react';
import ReactDOM from 'react-dom';
import {getQueriesForElement, queries} from 'dom-testing-library';

import {FavoriteNumber} from '../src/favorite-number';

describe('FavoriteNumber', () => {
  test('renders a number input with a label "Favorite Number"', () => {
    const div = document.createElement('div');

    ReactDOM.render(<FavoriteNumber />, div);

    // using dom-testing-library we can rather query for the input by its label.
    // This way, if there is a typo on the label, we'll pick up the issue
    // straight away.
    // const input = queries.getByLabelText(div, 'Favorite Number');

    // testing for label text is brittle because tests will break if case
    // changes. Instead, query using a case-insensitive regex
    // const input = queries.getByLabelText(div, /favorite number/i);

    // instead of explicit imports for queries, we can get all the query methods
    // from dom-testing-library
    const {getByLabelText} = getQueriesForElement(div);
    const input = getByLabelText(/favorite number/i);

    expect(input).toHaveAttribute('type', 'number');
    expect(div.querySelector('label')).toHaveTextContent('Favorite Number');
  });
});
