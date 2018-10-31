# JavaScript Mocking Fundamentals

1. [Override Object Properties to Mock with Monkey-patching in JavaScript](./ 01-override-object-props-to-mock-with-monkey-patching.js)

   ```bash
   $ node 01-override-object-props-to-mock-with-monkey-patching.test.js
   ```

   We import both `thumb-war` and `utils`, and mock out `utils.getWinner` so
   that we can evaluate other aspects of `thumb-war`. We are making
   `utils.getWinner` deterministic, as the randomness of what it usually returns
   will affect the outcomes of our tests in non-deterministic ways.

   After mocking, one should always clean up so that subsequent tests are not
   affected by the mock.
