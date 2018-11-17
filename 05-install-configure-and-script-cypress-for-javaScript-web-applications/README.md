# install, configure, and script Cypress for JavaScript web applications

1. Install and run Cypress

   Once Cypress is installed in a project, we can run it with:

   ```bash
   $ npx cypress open
   ```

   This generates a number of tests and files in `./cypress` folder, including
   a folder for integration tests, fixtures, plugins, and support.

2. Write the first Cypress Test

   ```bash
   $ npm run dev & npx cypress open
   ```

   Tests in Cypress need to start with `cy.visit()` in order for Cypress to know
   what to render for integration tests to be written.

   We configure Cypress to test our app using `cy.visit('http://localhost:[port]')`
   once our server is running.

   By default, Cypress creates an integration folder in the `cypress` folder
   created when first run.

   To make it clear that we are writing end-to-end tests, we'll change it to
   `e2e`. Cypress won't know about this change until we specify to use the
   folder. We can do so by adding and `integrationFolder` property to our
   `cypress.json`.

   Once Cypress visits our app in the browser, we can select elements to
   interact with.

   To get an element, we use `.get('.my-selector')`. We can trigger a click on
   it with `.click()`. We can run assertions on elements using
   `.should('[assertion.command]', 'value-to-compare')`.

3. Configure Cypress in cypress.json

   Cypress can be configured via `cypress.json`.

   Instead of passing `http://localhost:8080` to all of our tests in
   `cy.visit()`, we can configure a `baseUrl` property that will be used in our
   tests, for which we can provide only paths.

   This solves another problem - by specifying a full URL, Cypress will reload
   the app every time the test is rerun. Using `baseUrl` overcomes this.

   We can move our `calculator.js` test in `cypress/integration` into
   `cypress/e2e` to better describe the intent of our tests.

   Cypress runs integration tests by default from `cypress/integration`, so
   we'll need to configure the `integrationFolder`

   By default Cypress runs apps at 1000x660. We can use the `viewportWidth` and
   `viewportHeight` properties in the config to specify our own dimensions.

   In Cypress' UI we can view the entire config for the project, including
   environment variables, plugin overrides, and CLI flags.

4. Installing cypress-testing-library

   Currently the `.get()` commands in our calculator test are pretty nasty. We
   can leverage `cypress-testing-library` to benefit from commands similar to
   those in `react-testing-library`.

   Once `cypress-testing-library` is installed, we need to extend `cy`'s
   commands. This is done by importing commands into
   `cypress/support/index.js`. We import `cypress-testing-library/add-commands` here.

   Now we can change `.get()` to `.getByText`, `.getByTestId` etc.
