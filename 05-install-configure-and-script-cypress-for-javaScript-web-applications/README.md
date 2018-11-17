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
