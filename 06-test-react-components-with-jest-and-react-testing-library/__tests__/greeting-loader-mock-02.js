import 'react-testing-library/cleanup-after-each'
import 'jest-dom/extend-expect'
import React from 'react';
import {render, fireEvent, wait} from 'react-testing-library'

import {GreetingLoader} from '../src/greeting-loader-02-mocking'

describe('GreetingLoader', () => {
  test('loads greetings on click with dependency injection', async () => {
    const loadGreeting = jest.fn(subject => Promise.resolve({data: {greeting: `Hi ${subject}`}}));
    const name = 'Mary';
    const {getByText, getByLabelText, getByTestId} = render(<GreetingLoader loadGreeting={loadGreeting} />);
    const input = getByLabelText(/name/i);
    const loadButton = getByText(/load/i);

    input.value = name;

    fireEvent.click(loadButton);

    expect(loadGreeting).toHaveBeenCalledTimes(1)
    expect(loadGreeting).toHaveBeenCalledWith(name)

    await wait(() => expect(getByTestId('greeting')).toHaveTextContent(`Hi ${name}`))
  })
})
