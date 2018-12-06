import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';

import React from 'react';
import {render, within} from 'react-testing-library';

import {Modal} from '../src/Modal';

describe('Modal', () => {
  test('-> renders children', () => {
    const {debug, getByText} = render(
      <Modal>
        <div className="hey">test text</div>
      </Modal>
    );

    // we can see that the modal is appended to  body
    debug();

    // this query is scoped to the full document
    expect(getByText(/test text/)).toBeInTheDocument();

    // we can scope our queries to only what is rendered in the React portal
    // using react-testing-library's within, passing it
    const {getByText: getByTextWithin} = within(
      document.getElementById('modal-root')
    );

    // this query is scoped to #modal-root
    expect(getByTextWithin(/test text/)).toBeInTheDocument();
  });
});
