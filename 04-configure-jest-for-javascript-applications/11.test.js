import React from 'react';
// import {render} from 'react-testing-library';

import CalculatorDisplay from './src/calculator-display';

// we can manually wrap our component in a provider, but we can also abstract
// this to a utils file so that other components can easily by wrapped in the
// theme provider
// import {ThemeProvider} from 'emotion-theming';
// import {dark} from './src/themes';

// We can abstract wrappig our components in a provider using this utility, but
// this utility can also be abstracted as a utility available to all of our
// tests
// const renderWithProviders = (ui, options) => {
//   return render(<ThemeProvider theme={dark}>{ui}</ThemeProvider>);
// };

// we can now import the utils manually into our tests, but if these utils are
// being imported from different test files all over the place, managing paths
// can quickly become tedious
// We can instead make these utils available through Jest's config
// import {renderWithProviders} from './test/calculator-test-utils';

// Using moduleDirectories in Jest we can make our utils easily available
// without any complicated or tedious import paths
// But we can still go one step further... instead of having to use
// `renderWithProviders` it would be nice if we can continue using `render`
// import {renderWithProviders} from 'calculator-test-utils';

// while benefitting from wrapping our components
// This can be achieved by exporting everything react-testing-library exports,
// and overriding `render` with our own renderer
import {render} from 'calculator-test-utils';

test('mounts', () => {
  // Anything that reslies on data from a Provider needs to be wrapped in a
  // Provider in order to get that data.
  // This can be done manually, as we've done here, but it becomes tediuos to do
  // so.
  // const {container} = render(
  //   <ThemeProvider theme={dark}>
  //     <CalculatorDisplay value="0" />
  //   </ThemeProvider>
  // );

  const {container} = render(<CalculatorDisplay value="0" />);

  // The CalculatorDisplay comoonent uses emotion, and we've got our emotion
  // serialiser configured so that we can evaluate changes to the styles in our
  // snapshots
  // If we evaluate the original snapshot generated in 06, we'll see that color
  // and background are not output - this is because CalculatorDisplay relies on
  // a theme to get those values, but we're not providing any theme, so that
  // values are undefined
  // This can be corrected by wrapping our component in a provider
  expect(container.firstChild).toMatchSnapshot();
});
