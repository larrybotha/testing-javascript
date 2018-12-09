import 'jest-dom/extend-expect';

import {getQueriesForElement, fireEvent} from 'dom-testing-library';

import {Counter} from '../src/from-html';

const render = fromHtmlClass => {
  const container = document.createElement('div');
  const instance = new fromHtmlClass();
  instance.mount(container);

  return {
    container,
    ...getQueriesForElement(container),
  };
};

describe('Counter', () => {
  test('increments', () => {
    const {getByText} = render(Counter, {count: 0});
    const button = getByText('0');

    fireEvent.click(button);

    expect(button).toHaveTextContent(1);

    fireEvent.click(button);

    expect(button).toHaveTextContent(2);
  });
});
