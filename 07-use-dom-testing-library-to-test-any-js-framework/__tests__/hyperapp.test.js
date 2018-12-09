import 'jest-dom/extend-expect';

import * as hyperapp from 'hyperapp';
import {getQueriesForElement, wait} from 'dom-testing-library';

import {fireEventAsync} from './helpers/fire-event-async';

import {actions as axns, state as st8, view as ui} from '../src/hyperapp';

// as with Preact, HyperApp renders at the end of each event loop, but does so
// on the initial render, too
// We need to use async / await for our render helper, and when calling render
const render = async ({actions = axns, state = st8, view = ui} = {}) => {
  const container = document.createElement('div');
  hyperapp.app(state, actions, view, container);

  await wait();

  return getQueriesForElement(container);
};

describe('counter', () => {
  test('increments', async () => {
    // because our render is async we need to wait for our render to return
    // anything before running assertions
    const {getByText} = await render();
    const button = getByText('0');

    // as with changing state in Preact, we need to await changes in state
    // because of state only being updated at the end of the event loop
    await fireEventAsync.click(button);

    expect(button).toHaveTextContent(1);

    await fireEventAsync.click(button);

    expect(button).toHaveTextContent(2);
  });
});
