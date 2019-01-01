# Static Analysis Testing JavaScript Applications

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [1. Lint JavaScript by configuring and running ESLint](#1-lint-javascript-by-configuring-and-running-eslint)
- [2. Format Code by installing and running Prettier](#2-format-code-by-installing-and-running-prettier)
- [3. Configure Prettier](#3-configure-prettier)
- [4. Disable Unnecessary ESLint Stylistic Rules with eslint-config-prettier](#4-disable-unnecessary-eslint-stylistic-rules-with-eslint-config-prettier)
- [5. Validate all files are formatted when linting](#5-validate-all-files-are-formatted-when-linting)
- [6. Avoid Common Errors with Flow Type Definitions](#6-avoid-common-errors-with-flow-type-definitions)
- [7. Validate Code in a pre-commit git Hook with husky](#7-validate-code-in-a-pre-commit-git-hook-with-husky)
- [8. Auto-format all files and validate relevant files in a precommit script with `lint-staged`](#8-auto-format-all-files-and-validate-relevant-files-in-a-precommit-script-with-lint-staged)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 1. Lint JavaScript by configuring and running ESLint

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

## 2. Format Code by installing and running Prettier

`prettier` can be used to format code in files via CLI:

```bash
$ prettier --write path/to/files
```

`prettier` can be used to format markdown and graphql, too.

## 3. Configure Prettier

`prettier` allows for a `.prettierignore` to ignore formatting of generated
files

## 4. Disable Unnecessary ESLint Stylistic Rules with eslint-config-prettier

`extend`ed eslint configs take precedence from the end of the array.

`rules` in the the eslint config take precedence over any extensions.

## 5. Validate all files are formatted when linting

`prettier` can be run with a `--list-different` flag which exits with a
non-zero code if there are any files that are not formatted correctly. This
can be used with `ghooks` to ensure all team members are using `prettier`.

npm scripts can forward command line arguments to each other using the `--`
operator:

```json
  ...
  "scripts": {
    "myscript": "some-command",
    "myscript:alpha": "npm run myscript -- --some-flag"
  }
  ...
```

```bash
$ npm run myscript -- --some-flag

# or
$ npm run myscript:alpha
```

## 6. Avoid Common Errors with Flow Type Definitions

Use `@flow` at the top of files that you want to use `flow` to make type
strict after installing `flow-bin` as a dev dependency.

## 7. Validate Code in a pre-commit git Hook with husky

`husky` works in a similar way to `ghooks`, except that you add npm scripts
to run pre and post-hooks.

## 8. Auto-format all files and validate relevant files in a precommit script with `lint-staged`

`lint-staged` not only allows linters to be run on precommit, but allows one
to define commands to be run should linting pass, allowing for repo owners to
have autoformatting run and changed files staged without relying on
collaborators to have autoformatters enabled.
