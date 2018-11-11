import React from 'react';
import {render} from 'react-testing-library';
import loadable from 'react-loadable';
import Calculator from './src/calculator';

test('renders', async () => {
  await loadable.preloadAll();
  const {container, debug} = render(<Calculator />);

  // by using react-testing-library's debug function we can evaluate in a pretty
  // printed format what the user will interact with.
  // We can see that this test is outputting the loader and not the calculator
  // display, and this is because the display is loaded via a dynamic import
  // By changing this test to an async test we can instead test the component
  // with the display loaded
  // Calculator is configured to import calculator-display as if it were a
  // module, and not a local file. This is useful on large projects, and
  // possible by configuring the `resolve` property in webpac to include folders
  // in addition to node_modules, e.g.:
  // ...
  //    resolve: {
  //      modules: ['node_modules', 'src', 'shared']
  //    }
  // ...
  // To overcome the module import of calculator display we can configure the
  // moduleDirectories property in our jest config
  debug(container);
});
