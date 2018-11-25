import 'jest-dom/extend-expect';
import React from 'react';
import ReactDOM from 'react-dom';
import {render, cleanup} from 'react-testing-library';
// instead of using Jest's afterEach hook explicitly, we can use
// react-testing-library to automatically cleanup for us
import 'react-testing-library/cleanup-after-each';

import {FavoriteNumber} from '../src/favorite-number';

// instead of manually cleaning up inside each test, we can use Jest's afterEach
// hooks to run cleanup for us
// afterEach(cleanup)

describe('FavoriteNumber', () => {
  test('renders a number input with a label "Favorite Number"', () => {
    const {container, getByLabelText, unmount} = render(<FavoriteNumber />);
    const input = getByLabelText(/favorite number/i);

    // react-testing-library's render method works a bit differently in that it
    // renders components onto a body tag so that we can benefit from the full
    // DOM eventing system
    // We can inspect this by looking directly at the body element
    // The problem is that every time we render a component, it's going to be on
    // the body, and we'll end up rendering more and more instances onto the
    // body, increasing the likelihood of faulty tests
    // To address this, we can use `cleanup` from react-testing-library
    console.log(document.body.outerHTML);

    expect(input).toHaveAttribute('type', 'number');

    // cleanup our rendering once our tests are done
    // cleanup();
    // console.log(document.body.outerHTML);
  });
});
