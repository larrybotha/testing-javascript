import 'jest-dom/extend-expect';

import Vue from 'vue/dist/vue';
import {getQueriesForElement} from 'dom-testing-library';

import {fireEventAsync} from './helpers/fire-event-async';

import {Counter} from '../src/vue';

const render = Component => {
  // mount our component
  const vm = new Vue(Component).$mount();

  // use $el to get queries for our component
  return {
    container: vm.$el,
    ...getQueriesForElement(vm.$el),
  };
};

describe('Counter', () => {
  // Vue updates state at the end of each event loop, so we need to wait for
  // updates before asserting
  test('increments', async () => {
    const {getByText} = render(Counter);
    const button = getByText('0');

    // wait for button clicks to update state
    await fireEventAsync.click(button);

    expect(button).toHaveTextContent(1);

    await fireEventAsync.click(button);

    expect(button).toHaveTextContent(2);
  });
});
