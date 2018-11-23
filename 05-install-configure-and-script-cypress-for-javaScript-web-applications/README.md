# install, configure, and script Cypress for JavaScript web applications

Checkout individual branches for changes specific to that section of the course.

1. **Install and run Cypress**

   Once Cypress is installed in a project, we can run it with:

   ```bash
   $ npx cypress open
   ```

   This generates a number of tests and files in `./cypress` folder, including
   a folder for integration tests, fixtures, plugins, and support.

2. **Write the first Cypress Test**

   ```bash
   $ npm run dev & npx cypress open
   ```

   [`calculator.js`](./cypress/e2e/calculator.js)

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

3. **Configure Cypress in cypress.json**

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

4. **Installing cypress-testing-library**

   Currently the `.get()` commands in our calculator test are pretty nasty. We
   can leverage `cypress-testing-library` to benefit from commands similar to
   those in `react-testing-library`.

   Once `cypress-testing-library` is installed, we need to extend `cy`'s
   commands. This is done by importing commands into
   `cypress/support/index.js`. We import `cypress-testing-library/add-commands` here.

   Now we can change `.get()` to `.getByText`, `.getByTestId` etc.

5. **Scripting Cypress for local development and Continuous Integration**

   In order to run Cypress we need to first run our server, and then start
   Cypress once that's running. It'd be convenient to be able to have the
   server start and Cypress then run once the server is receiving responses.

   This is also required for CI, because we need some way to start the server,
   run Cypress, and then kill the server once Cypress is done.

   We can use `start-server-and-test` to start our server, wait for the app to
   be accepting requests, run Cypress, and then kill our server.

   When we run Cypress on CI we don't want/need the UI. `cypress run` runs tests
   on Cypress without the UI.

   Using `is-ci`, `start-server-and-run`, `npm-run-all`, and separating our
   scripts we can simplify running our application and tests at the same time.

6. **Debug a test with Cypress**

   Because Cypress uses Chrome you can use dev tools to debug your tests.

   To debug tests in Cypress, chain a `.then` that accepts a subject and
   returns it. Inside this statement you can place a `debugger` statement.

   Cypress adds a `Cypress` object to the global object which can be used in
   tests to determine whether a file is being executed in the context of
   Cypress or not.

7. **Use Cypress to test user registration**

   [`register.js`](./cypress/e2e/register.js)

   We can automate registration by navigating to the sign up page, entering in
   details, and submitting the form.

   Using `test-data-bot` we can generate credentials for users using `faker`s
   API.

   To have Cypress simulate a user typing out text, we use the `.type('text to type')`
   command once we have a subject (an element).

   We can evaluate the current URL using `.url().should('eq', myUrl)`

   Cypress provides access to config values inside tests via `Cypress.config()`

   We can evaluate the `window` object using `.window()` to make it the
   subject.

   To evaluate properties on a subject, we use the `.its('property[name]')`
   command:

   ```javascript
   ...
     .window()
     .its('document.body')
     .should('have.class', 'my-class')
   ...
   ```

   Type assertions can be done using `.should('be.a', expectedType)`

8. **Cypress Driven Development**

   Because Cypress can automate repetitive work, one can use it in a similar
   manner to test-driven-development. We can automate away repetitive work
   through Cypress, while having the tests validate that we're on the right
   path.

   Because Cypress is running an instance of Chrome, we can do our development
   inside Cypress with little need for running our apps in regular browsers.

   Cypress allows one to override the default timeout when resolving subjects:

   ```javascript
   ...
    .get(someSubject, {timeout: 500})
   ...
   ```

9. **Simulate HTTP Errors in Cypress Tests**

   [`register.js`](./cypress/e2e/register.js)

   We can stub out requests to services in Cypress so that we can evaluate what
   happens for different responses.

   We need to do a few things in order to stub out requests:

   1. indicate to Cypress that we want to use mock server:

      ```javascript
      cy.server()
      ```

   2. define which requests Cypress should stub out, and how to respond:

      ```javascript
      cy.route({
        method: 'POST',
        url: requestUrl,
        status: 500,
        response: {},
      })
      ```

   With the mock server in place, and our path stubbed, we can evaluate how the
   UI is handling these different responses.

10. **Test user login with Cypress**

    [`login.js`](./cypress/e2e/login.js)

    We can validate the log in flow using a similar approach as with
    `register.js`. We don't yet have a user, so we need to first register the
    user, and then go through the log in flow using the same credentials.

11. **Create a user with cy.request from Cypress**

    [`login.js`](./cypress/e2e/login.js)

    In `login.js` we've duplicated the registration flow. This makes maintaining
    the tests more difficult when there are changes or errors, and we're just
    doing the same work again.

    To get around this, we can instead make the request to the registration
    endpoint to register the user, and the test only the log in flow.

    This can be achieved using `cy.request(options)`.

12. **Keep tests isolated and focused with custom Cypress commands**

    Being able to create the new user on `login.js` is convenient, but if other
    tests need a user to be created, it can quickly become tedious to repeat the
    same process.

    To address this, we can create a custom Cypress command in
    `cypress/support/commands.js`:

    ```javascript
    Cypress.Command.add('myCommand', () => {
      cy.request(options)
    })
    ```

13. **Use custom Cypress command for reusable assertions**

    [`cypress/support.commands.js`](./cypress/support/commands.js)

    Different tests will often require the same assertions - does logging in take
    the user to the home page, does registration take a user to the same page?

    Instead of writing the same assertions in multiple tests, we can move those
    assertions to the `commands.js` file in the `support` folder, and then reuse
    the custom commands in our tests.

14. **Run tests as an authenticated user with Cypress**

    [`calculator.js`](./cypress/e2e/calculator.js)

    We've tested the calculator for anonymous users, but we don't yet know that
    authenticated users will not be affected by changes to the application.

    We can create a user, log them in, and then assert that they are in fact
    logged in.

    We can then log them out, and then assert that they are in fact logged out,
    too.

15. **Use `cy.request` from Cypress to authenticate as a new user**

    [`calculator.js`](./cypress/e2e/calculator.js)

    In our last update to calculator we rewrote the log in flow that is already
    tested in `login.js`.

    Instead of running through the entire flow, we can use `cy.request` to make
    a request directly to the API, and then use `window.localStorage` to set the
    token in `localStorage`, before running any assertions.

16. **Use a custom Cypress command to login as a user**

    [`commands.js`](./cypress/support/commands.js)

    [`calculator.js`](./cypress/e2e/calculator.js)

    The login request in `calculator.js` will likely be needed by other tests,
    so we can create a custom command to reuse it later.

17. **Combine custom Cypress commands into a single custom command**

    [`commands.js`](./cypress/support/commands.js)

    [`calculator.js`](./cypress/e2e/calculator.js)

    To make things even smother, we can use commands within commands. Doing
    this we can combine creating a user and logging them in into a single step.
