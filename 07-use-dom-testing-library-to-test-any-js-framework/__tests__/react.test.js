import 'jest-dom/extend-expect';

import React from 'react';
import ReactDOM from 'react-dom';
import {getQueriesForElement, fireEvent} from 'dom-testing-library';

import {Counter} from '../src/react';

const render = ui => {
  const container = document.createElement('div');

  // we use ReactDOM's render function to render our UI into our container
  ReactDOM.render(ui, container);

  // We need to append our container to body, otherwise events won't propagate
  // React appends events to document.body, and not to the elements themselves
  document.body.appendChild(container);

  return {
    ...getQueriesForElement(container),
    container,
    cleanup() {
      // first unmount the component we mounted
      ReactDOM.unmountComponentAtNode(container);
      // and then remove the component from the DOM
      document.body.removeChild(container);
    },
  };
};

describe('Counter', () => {
  test('renders', () => {
    const {cleanup, getByText} = render(<Counter />);
    const counter = getByText('0');

    fireEvent.click(counter);

    expect(counter).toHaveTextContent('1');

    // we can inspect the DOM to see our component has rendered
    console.log(document.body.outerHTML);

    // let's clean up, and ensure that our mounted component is no longer in the
    // DOM
    cleanup();
    console.log(document.body.outerHTML);
  });
});
