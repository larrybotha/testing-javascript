import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';

import React from 'react';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {render, fireEvent} from 'react-testing-library';

import {ConnectedCounter, reducer} from '../src/redux-app';

// allow our user to pass in a store, otherwise create one using the app's reducer
const renderWithRedux = (
  ui,
  {initialState, store = createStore(reducer, initialState), ...options} = {}
) => {
  const utils = render(<Provider store={store}>{ui}</Provider>, options);

  return utils;
};

describe('ConnectedCounter', () => {
  test('renders with redux defaults', () => {
    const {getByText, getByTestId} = renderWithRedux(<ConnectedCounter />);
    expect(getByTestId('count-value')).toHaveTextContent(0);

    const incButton = getByText('+');
    const decButton = getByText('-');

    fireEvent.click(incButton);

    expect(getByTestId('count-value')).toHaveTextContent(1);

    fireEvent.click(decButton);

    expect(getByTestId('count-value')).toHaveTextContent(0);
  });

  test('can render with custom initial state', () => {
    const {getByText, getByTestId} = renderWithRedux(<ConnectedCounter />, {
      initialState: {count: 3},
    });

    expect(getByTestId('count-value')).toHaveTextContent(3);
  });
});
