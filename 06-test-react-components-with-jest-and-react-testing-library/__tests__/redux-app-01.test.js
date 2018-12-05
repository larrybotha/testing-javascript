import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';

import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {render, fireEvent} from 'react-testing-library';

import {ConnectedCounter, reducer} from '../src/redux-app';

describe('ConnectedCounter', () => {
  test('renders with redux defaults', () => {
    const store = createStore(reducer);
    const {getByText, getByTestId} = render(
      <Provider store={store}>
        <ConnectedCounter />
      </Provider>
    );
    expect(getByTestId('count-value')).toHaveTextContent(0);

    const incButton = getByText('+');
    const decButton = getByText('-');

    fireEvent.click(incButton);

    expect(getByTestId('count-value')).toHaveTextContent(1);

    fireEvent.click(decButton);

    expect(getByTestId('count-value')).toHaveTextContent(0);
  });
});
