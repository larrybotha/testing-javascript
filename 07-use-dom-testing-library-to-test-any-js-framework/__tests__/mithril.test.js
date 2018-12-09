import 'jest-dom/extend-expect';

import m from 'mithril';
import {fireEvent, getQueriesForElement, wait} from 'dom-testing-library';

import {Counter} from '../src/mithril';

const render = ui => {
  const container = document.createElement('div');

  m.mount(container, ui);

  return {
    container,
    ...getQueriesForElement(container),
  };
};

describe('Counter', () => {
  test('increments', async () => {
    const {getByText} = render(Counter);
    const button = getByText('0');

    fireEvent.click(button);

    await wait(() => expect(button).toHaveTextContent(1));

    fireEvent.click(button);

    await wait(() => expect(button).toHaveTextContent(2));
  });
});
