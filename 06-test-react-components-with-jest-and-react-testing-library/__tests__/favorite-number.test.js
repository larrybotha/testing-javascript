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

    debug();

    expect(input).toHaveAttribute('type', 'number');
  });

  test('enterering an invalid value shows an error message', () => {
    const {debug, queryByTestId, getByLabelText} = render(<FavoriteNumber />);
    debug();
    const input = getByLabelText(/favorite number/i);

    expect(queryByTestId('error-message')).toBeFalsy();

    // dispatch a 'change' event on the input, providing an event object that
    // will be passed to the event handler.
    fireEvent.change(input, {target: {value: 10}});

    expect(queryByTestId('error-message')).toHaveTextContent(
      /the number is invalid/i
    );
    debug();
  });

  test('a prop change with an invalid value shows the error message', () => {
    const {getByTestId, getByLabelText, rerender} = render(<FavoriteNumber />);
    const input = getByLabelText(/favorite number/i);

    fireEvent.change(input, {target: {value: 6}});

    rerender(<FavoriteNumber max={5} />);

    expect(getByTestId('error-message')).toHaveTextContent(
      /the number is invalid/i
    );
  });
});
