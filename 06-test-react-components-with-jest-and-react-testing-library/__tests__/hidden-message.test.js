import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';

import React from 'react';
import {render, fireEvent} from 'react-testing-library';

import {HiddenMessage} from '../src/hidden-message';

// we don't want to have to wait for a full second (as defined by Fade's
// timeout) in order to test our component, so we mock out CSSTransition so that
// we can either show or hide content immediately
jest.mock('react-transition-group', () => ({
  CSSTransition: props => (props.in ? props.children : ''),
}));

describe('HiddenMessage', () => {
  test('shows hidden message when toggled', () => {
    const children = 'foo';
    const {getByText, queryByText} = render(
      <HiddenMessage>{children}</HiddenMessage>
    );
    const button = getByText(/toggle/i);
    expect(queryByText(children)).not.toBeInTheDocument();

    fireEvent.click(button);
    expect(getByText(children)).toBeInTheDocument();

    fireEvent.click(button);
    expect(queryByText(children)).not.toBeInTheDocument();
  });
});
