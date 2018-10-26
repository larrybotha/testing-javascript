# Static Analysis Testing JavaScript Applications

1. [Lint JavaScript by configuring and running ESLint](./01-configuring-eslint.js)

    ```bash
    $ npm run lint
    ```

    Eslint rules with `error` will exit the process and fail a build.

    Eslint rules with `warn` will continue to run the process and not fail a
    build.

    Eslint rules with `off` will ignore the rule entirely.

    One can extend one's eslint config using the `extends` property.
    `eslint:recommended` is a built-in config.

    The `env` property can be used to set the environment against which files
    should be evaluated.
