import React from 'react';
import {render} from 'react-testing-library';
import Calculator from './src/calculator';

test('renders', () => {
  render(<Calculator />);
});
