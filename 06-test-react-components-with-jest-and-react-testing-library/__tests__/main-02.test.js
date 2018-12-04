import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';

import React from 'react';
import {render as rtlRender, fireEvent} from 'react-testing-library';
import {Router} from 'react-router';
import {createMemoryHistory} from 'history';

import {Main} from '../src/main-02';

// create a custom render function that will render any UI inside a configurable
// Router
const render = (
  ui,
  // set a default options parameter
  {
    route = '/',
    history = createMemoryHistory({initialEntries: [route]}),
    ...options
  } = {}
) => {
  // return everything react-testing-library's render returns, as well as history
  return {
    ...rtlRender(<Router history={history}>{ui}</Router>),
    history,
  };
};

describe('Main', () => {
  test('can navigate to about (using Router)', () => {
    const history = createMemoryHistory({initialEntries: ['/']});
    // use our custom render, making it appear as if we're simply rendering Main
    const {getByTestId, getByText, queryByTestId} = render(<Main />);

    expect(getByTestId('home-route')).toBeInTheDocument();
    expect(queryByTestId('about-route')).not.toBeInTheDocument();

    const aboutLink = getByText(/about/i);

    fireEvent.click(aboutLink);

    expect(queryByTestId('home-route')).not.toBeInTheDocument();
    expect(getByTestId('about-route')).toBeInTheDocument();
  });

  test('displays no match route when no match', () => {
    const {debug, getByTestId, getByText, queryByTestId} = render(<Main />, {
      route: '/foo',
    });

    expect(getByTestId('no-match-route')).toBeInTheDocument();
    expect(queryByTestId('home-route')).not.toBeInTheDocument();
    expect(queryByTestId('about-route')).not.toBeInTheDocument();
  });
});
