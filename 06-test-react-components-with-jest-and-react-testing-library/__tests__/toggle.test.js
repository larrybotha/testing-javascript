import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';

import React from 'react';
import {render} from 'react-testing-library';

import {Toggle} from '../src/toggle';

// abstract setup of render prop
const setup = args => {
  // create a childrenArg that holds the props passed to it by the render prop
  // component
  const childrenArg = {};
  // create a children function which the render prop component will pass
  // arguments to
  const children = args => {
    // every time the function is called, assigned childrenArg the new values
    Object.assign(childrenArg, args);

    // return null, because React expects null, a string, or a component to be
    // returned inside render
    return null;
  };

  return {childrenArg, children};
};

describe('Toggle', () => {
  test('renders components that can toggle state', () => {
    const {children, childrenArg} = setup();
    render(<Toggle>{children}</Toggle>);

    // use the toggle prop directly to assert that it's doing what it should
    childrenArg.toggle();
    expect(childrenArg).toHaveProperty('on', true);

    childrenArg.toggle();
    expect(childrenArg).toHaveProperty('on', false);
  });
});
