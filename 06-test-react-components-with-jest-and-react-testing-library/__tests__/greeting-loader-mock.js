import 'react-testing-library/cleanup-after-each'
import 'jest-dom/extend-expect'
import React from 'react';
// import `wait`, as we are testing async functionality in a component, and we
// need to defer the assertion until Promises are resolved
import {render, fireEvent, wait} from 'react-testing-library'

import {GreetingLoader} from '../src/greeting-loader-01-mocking'
// import the api function we are going to mock
import {loadGreeting as mockLoadGreeting} from '../src/api'

// mock the api function with a function we can track
jest.mock('../src/api', () => {
  return {
    loadGreeting: jest.fn(subject => Promise.resolve({data: {greeting: `Hi ${subject}`}})),
  }
})

describe('GreetingLoader', () => {
  // this test is asserting async behaviour, so we need our test to be async
  test('loads greetings on click', async () => {
    const name = 'Mary'
    const {getByText, getByLabelText, getByTestId} = render(<GreetingLoader />)
    const input = getByLabelText(/name/i)
    const loadButton = getByText(/load/i);

    // set the input so that when we trigger a submission the api function
    // receives a form value
    input.value = name;

    // trigger a submit
    fireEvent.click(loadButton);

    // assert the mock function
    expect(mockLoadGreeting).toHaveBeenCalledTimes(1)
    expect(mockLoadGreeting).toHaveBeenCalledWith(name)

    // await the response from calling the api function from within a callback
    // in `wait`
    await wait(() => expect(getByTestId('greeting')).toHaveTextContent(`Hi ${name}`))
  })
})
