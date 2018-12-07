/* @jsx Preact.h */
import 'jest-dom/extend-expect';

import Preact from 'preact';
import {getQueriesForElement, fireEvent, wait} from 'dom-testing-library';

import {fireEventAsync} from './helpers/fire-event-async';

import {Counter} from '../src/preact';

const render = ui => {
  const container = document.createElement('div');

  Preact.render(ui, container);

  return {
    ...getQueriesForElement(container),
    container,
  };
};

describe('Counter', () => {
  // we need to make this test async, because unlike React, Preact doens't
  // render synchronously, and instead will render the result of state changes
  // on the next tick.
  // We need to wait for that next tick, and one method is using async / await
  // Alternatively, setTimeout can be used
  test('updates state on clicks', async () => {
    const {container, getByText} = render(<Counter />);
    console.log(container);
    const counter = getByText('0');

    fireEvent.click(counter);

    // use dom-testing-library's wait to wait for the next tick in the event
    // loop before we run any assertions, otherwise state changes will not
    // reflect in our tests
    await wait();

    expect(counter).toHaveTextContent('1');

    fireEvent.click(counter);

    await wait();

    expect(counter).toHaveTextContent('2');
  });

  test('updates state on clicks, with helper', async () => {
    const {container, cleanup, getByText} = render(<Counter />);
    console.log(container);
    const counter = getByText('0');

    await fireEventAsync.click(counter);

    expect(counter).toHaveTextContent('1');

    await fireEventAsync.click(counter);

    expect(counter).toHaveTextContent('2');
  });
});
