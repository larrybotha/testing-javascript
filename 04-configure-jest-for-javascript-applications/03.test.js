import {getFormattedValue} from './src/utils';

test('formats the value', () => {
  expect(getFormattedValue('1234.0')).toBe('1,234.0');
});

// we have access to window, despite being in a node environment, because Jest
// makes use of jsdom by default for us
// We can configure Jest to run exclusively for the browser, or node, via
// jest.config.js
// console.log(window);
