import 'jest-dom/extend-expect';
import React from 'react';
import ReactDOM from 'react-dom';
import {fireEvent, render} from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';

import {FavoriteNumber} from '../src/favorite-number';

describe('FavoriteNumber', () => {
  test('renders a number input with a label "Favorite Number"', () => {
    const {debug, getByLabelText} = render(<FavoriteNumber />);
    const input = getByLabelText(/favorite number/i);

    expect(input).toHaveAttribute('type', 'number');
  });

  test('entering an invalid value shows an error message', () => {
    const {debug, queryByTestId, getByLabelText} = render(<FavoriteNumber />);
    const input = getByLabelText(/favorite number/i);

    expect(queryByTestId('error-message')).toBeFalsy();

    fireEvent.change(input, {target: {value: 10}});

    expect(queryByTestId('error-message')).toHaveTextContent(
      /the number is invalid/i
    );
  });

  test('a prop change with an invalid value shows the error message', () => {
    const {getByTestId, getByLabelText, queryByTestId, rerender} = render(
      <FavoriteNumber />
    );
    const input = getByLabelText(/favorite number/i);

    // use a query to confirm that the element does not exist
    expect(queryByTestId('error-message')).toBeFalsy();

    fireEvent.change(input, {target: {value: 6}});

    rerender(<FavoriteNumber max={5} />);

    expect(getByTestId('error-message')).toHaveTextContent(
      /the number is invalid/i
    );
  });
});
