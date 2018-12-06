import 'react-testing-library/cleanup-after-each';

import React from 'react';
import {render} from 'react-testing-library';

import {Countdown} from '../src/countdown';

// because the component we're testing is using setInterval, we need mock the
// timer out using Jest, otherwise our tests may be subject to the timers,
// slowing our tests down
jest.useFakeTimers();

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  console.error.mockRestore();
});

describe('Countdown', () => {
  // my naive first implementation. This does, however, work, but it's only
  // ensuring that the component clears the interval
  // We don't explicitly know that setState will not be called after the
  // component has unmounted
  test('clears interval when unmounting', () => {
    jest.spyOn(global, 'clearInterval');
    const {unmount} = render(<Countdown />);

    unmount();

    expect(global.clearInterval).toHaveBeenCalledTimes(1);
  });

  // to assert that set state is not called after the component unmounts, we can
  // assert on console.error, since we know that React will throw an error if
  // state is set on an unmounted component
  test('does not set state after interval is cleared', () => {
    const {unmount} = render(<Countdown />);

    unmount();

    // we need to ensure that before any assertions are made that there are no
    // more pending timers to run, otherwise we may be running assertions before
    // our component has done all of its work
    jest.runOnlyPendingTimers();

    // if console.error was not called by the time there are no timers to run,
    // we know that setState didn't result in an error being thrown.
    expect(console.error).not.toHaveBeenCalled();
  });
});
