import React from 'react';
import {render} from 'react-testing-library';
import CalculatorDisplay from './src/calculator-display';
import {getFlyingSuperHeros} from './src/super-heros';

describe('super heros', () => {
  test('returns super heros that can fly', () => {
    const flyingHeros = getFlyingSuperHeros();

    expect(flyingHeros).toMatchSnapshot();
  });
});

describe('CalculatorDisplay', () => {
  test('mounts', () => {
    const {container} = render(<CalculatorDisplay value="0" />);

    // react-testing-library's render function returns its container property
    // wrapping your component in a div
    // Your component can be obtained at container.firstChild
    console.log(container.innerHTML);
    // console.log(container.firstChild);

    expect(container.firstChild).toMatchSnapshot();
  });
});
