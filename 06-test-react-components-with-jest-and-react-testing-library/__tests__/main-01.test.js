import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';

import React from 'react';
import {render, fireEvent} from 'react-testing-library';
// instead of using BrowserRouter component, we'll use the Router component
// directly so that we can pass in our own history explicitly
import {Router} from 'react-router';
// We can also do this by importing MemoryRouter from react-router-dom to save
// us a step in creating history
import {MemoryRouter} from 'react-router-dom';
// createMemoryHistory will allow us to create a history object that can be
// passed to Router
import {createMemoryHistory} from 'history';

import {Main} from '../src/main-01';

describe('Main', () => {
  test('can navigate to about (using Router)', () => {
    const history = createMemoryHistory({initialEntries: ['/']});
    const {getByTestId, getByText, queryByTestId} = render(
      <Router history={history}>
        <Main />
      </Router>
    );

    expect(getByTestId('home-route')).toBeInTheDocument();
    expect(queryByTestId('about-route')).not.toBeInTheDocument();

    const aboutLink = getByText(/about/i);

    fireEvent.click(aboutLink);

    expect(queryByTestId('home-route')).not.toBeInTheDocument();
    expect(getByTestId('about-route')).toBeInTheDocument();
  });

  test('can navigate to about (using MemoryRouter)', () => {
    const {debug, getByTestId, getByText, queryByTestId, rerender} = render(
      <MemoryRouter initialEntries={['/']}>
        <Main />
      </MemoryRouter>
    );

    expect(getByTestId('home-route')).toBeInTheDocument();
    expect(queryByTestId('about-route')).not.toBeInTheDocument();

    const aboutLink = getByText(/about/i);

    fireEvent.click(aboutLink);

    expect(queryByTestId('home-route')).not.toBeInTheDocument();
    expect(getByTestId('about-route')).toBeInTheDocument();
  });

  test('displays no match route when no match', () => {
    const {debug, getByTestId, getByText, queryByTestId, rerender} = render(
      <MemoryRouter initialEntries={['/foo']}>
        <Main />
      </MemoryRouter>
    );

    expect(getByTestId('no-match-route')).toBeInTheDocument();
    expect(queryByTestId('home-route')).not.toBeInTheDocument();
    expect(queryByTestId('about-route')).not.toBeInTheDocument();
  });
});
