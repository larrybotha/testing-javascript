import 'jest-dom/extend-expect';

import $ from 'jquery';

import {fireEvent, getQueriesForElement} from 'dom-testing-library';
import '../src/jquery';

describe('countify', () => {
  test('increments', () => {
    // create an element on which we can append the DOM we'll test
    const div = document.createElement('div');
    // append a button to test
    $(div).append(
      `
        <div>
          <button>0</button>
        </div>
      `
    );
    // countify it
    $(div).countify();
    const {getByText} = getQueriesForElement(div);
    const button = getByText('0');

    fireEvent.click(button);

    expect(button).toHaveTextContent(1);

    fireEvent.click(button);
    expect(button).toHaveTextContent(2);
  });
});
