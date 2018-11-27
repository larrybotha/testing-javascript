import React from 'react';
import 'react-testing-library/cleanup-after-each';
import {render} from 'react-testing-library';
// automatically extend expect
// This can also be added to Jest's setupTestFrameowrkScriptFile file to be
// available in all tests
import 'jest-axe/extend-expect';
// import axe and a matcher for a11y violations
import {axe, toHaveNoViolations} from 'jest-axe';

import {Form} from '../src/form';

// extend expect
// We don't need this if we simply import `jest-axe/extend-expect`
// expect.extend(toHaveNoViolations);

describe('Form', () => {
  // axe is async, so we need to make our test async
  test('not accessible when no label', async () => {
    const {container, debug} = render(<Form />);

    // get the result of evaluating a11y with axe
    const result = await axe(container.outerHTML);

    // use jest-axe's matcher to assert that our form is accessible
    expect(result).not.toHaveNoViolations();
  });

  test('accessibility when label', async () => {
    const {container, debug} = render(<Form isAccessible={true} />);

    const result = await axe(container.outerHTML);

    expect(result).toHaveNoViolations();
  });
});
