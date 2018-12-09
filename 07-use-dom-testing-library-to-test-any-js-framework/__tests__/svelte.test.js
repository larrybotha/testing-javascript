import 'jest-dom/extend-expect';

import * as svelte from 'svelte';
import {fireEvent, getQueriesForElement} from 'dom-testing-library';

import {counterTemplate} from '../src/svelte';

const render = (template, options = {}) => {
  const container = document.createElement('div');
  const Constructor = svelte.create(template);

  new Constructor({
    target: container,
    ...options,
  });

  return {
    container,
    ...getQueriesForElement(container),
  };
};

describe('Counter', () => {
  test('increments', () => {
    const {getByText} = render(counterTemplate, {data: {count: 0}});
    const button = getByText('0');

    fireEvent.click(button);

    expect(button).toHaveTextContent(1);

    fireEvent.click(button);

    expect(button).toHaveTextContent(2);
  });
});
