import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';

import React from 'react';
import {render, fireEvent} from 'react-testing-library';

import {ErrorBoundary} from '../src/error-boundary';
import {reportError as mockReportError} from '../src/api';

jest.mock('../src/api', () => ({
  reportError: jest.fn(() => Promise.resolve({success: true})),
}));

const Bomb = ({shouldThrow}) => {
  if (shouldThrow) throw new Error('boom');

  return null;
};

// we can mock out console.error that our Bomb component will throw, and do it
// before each test runs
// By doing this we run the risk of not getting information that would be
// valuable to our tests, so we need to assert that console.error is being
// called the correct number of times
beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});
// we need to clean that up, so we restore console.error its original
// implementation after each test
afterEach(() => {
  console.error.mockRestore();
});

describe('ErrorBoundary', () => {
  test('it reports errors and displays a message', () => {
    const {container, debug, getByText, rerender} = render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>
    );

    // rerender our component with an error, so we can assert that it's behaving
    // as it should
    rerender(
      <ErrorBoundary>
        <Bomb shouldThrow={true} />
      </ErrorBoundary>
    );

    // assert that our container has the text indicating that there's a problem
    expect(container).toHaveTextContent('problem');
    // console.error is called twice - once by React, and once by Jest
    expect(console.error).toHaveBeenCalledTimes(2);

    // expect.any and expect.stringContaining allow us to pass through
    // non-literal values to assertions
    // We need to assert that reportError is called with the correct parameters,
    // and instead of asserting against literal matches, we can specify to Jest
    // a more general constructor that we expect the parameters to match against
    const error = expect.any(Error);
    const info = {componentStack: expect.stringContaining('Bomb')};
    expect(mockReportError).toHaveBeenCalledTimes(1);
    expect(mockReportError).toHaveBeenCalledWith(error, info);

    // we need to reset our mocks here so that we can evaluate them again
    // without having to take into account the previous times they were called,
    // and the parameters they received in those calls
    console.error.mockReset();
    mockReportError.mockReset();

    // we rerender our component without throwing an error. At this point the
    // component state is unchanged, so our component is still rendering the
    // button
    rerender(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>
    );

    // fire an event on the try again button to trigger a rerender from within
    // the component
    fireEvent.click(getByText(/try again/i));

    // we assert that the container doesn't contain the 'problem' text, and that
    // console.error and reportError were not called
    expect(container).not.toHaveTextContent('problem');
    expect(console.error).not.toHaveBeenCalled();
    expect(mockReportError).not.toHaveBeenCalled();
  });
});
