import React from 'react';
import {render} from 'react-testing-library';
import Calculator from './src/calculator';

test('renders', () => {
  // this test will throw an error because we're using dynamic imports in the
  // component, which is not supported in node.
  // To overcome this, we need to instruct babel to handle the dynamic imports
  // when running tests.
  // babel-plugin-dynamic-import-node does exactly this for us
  render(<Calculator />);
});
