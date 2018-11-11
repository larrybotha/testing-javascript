import React from 'react';
import {render} from 'react-testing-library';

import AutoScalingText from './src/auto-scaling-text';

test('renders', () => {
  const {container} = render(<AutoScalingText />);
  // because we're mocking out css imports, the className on AutoScalingText
  // will be undefined, and we won't see a class output on the component
  // By using identity-obj-proxy in Jest's moduleNameMapper we can have a more
  // descriptive output for the className
  console.log(container.innerHTML);
});
