import React from 'react';
import {render} from 'react-testing-library';
import {ThemeProvider} from 'emotion-theming';

import {dark} from '../src/themes';

const renderWithProviders = (ui, options) => {
  return render(<ThemeProvider theme={dark}>{ui}</ThemeProvider>);
};

// we can export everything that react-testing-library exports so that we only
// need to import this module, and not this module and react-testng-library into
// our tests
export * from 'react-testing-library';
// we can go a step further and overwrite react-testing-library's render
// function so that we can use the same named function, but with the Provider
// automatically doing its job
export {renderWithProviders as render};
