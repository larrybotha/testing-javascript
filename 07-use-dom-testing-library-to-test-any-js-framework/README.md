# Use `dom-testing-library` to test any JS framework

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Takeaways](#takeaways)
- [1. Use `dom-testing-library` with React](#1-use-dom-testing-library-with-react)
- [2. Use `dom-testing-library` with Preact](#2-use-dom-testing-library-with-preact)
- [3. Use `dom-testing-library` with jQuery](#3-use-dom-testing-library-with-jquery)
- [4. Use `dom-testing-library` with Dojo](#4-use-dom-testing-library-with-dojo)
- [5. Use `dom-testing-library` with HyperApp](#5-use-dom-testing-library-with-hyperapp)
- [6. Use `dom-testing-library` with AngularJs](#6-use-dom-testing-library-with-angularjs)
- [7. Use `dom-testing-library` with Angular](#7-use-dom-testing-library-with-angular)
- [8. Use `dom-testing-library` with Vue](#8-use-dom-testing-library-with-vue)
- [9. Use `dom-testing-library` with Mithril](#9-use-dom-testing-library-with-mithril)
- [10. Use `dom-testing-library` with Svelte](#10-use-dom-testing-library-with-svelte)
- [11. Use `dom-testing-library` with `from-html`](#11-use-dom-testing-library-with-from-html)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Takeaways

Testing ui components can be broken down to the following steps:

1. create a `render` function to abstract the repetitive work of rendering the
   component you will be testing
2. identify how to render the component to HTML
3. append that HTML to a container you have control of
4. use `dom-testing-library` to get all the different functions for getting and
   querying elements in your container using `getQueriesForElement`
5. in your test, render the component using your `render` function
6. if the library renders asynchronously, make your test async, make your
   `render` function async, and `await` when calling your `render` function
7. if the library you are using renders updates asynchronously when events
   trigger updates, use `await` to wait for the update before asserting. Most
   async updates occur at the end of the current event loop, but not all. If you
   know updates happen via the event loop, you can simply use `await` and
   `dom-testing-library`s `wait`. If they are non-deterministically updated,
   e.g. not using the event loop, you'll need to assert inside `wait`s callback
   so that Jest keeps asserting until either the UI is updated or the test
   fails.

## 1. Use `dom-testing-library` with React

```bash
$ npx jest react
```

[`react.test.js`](./__tests__/react.test.js)

To manually mount a React component, we need a few things:

1. a `render` function that will mount our component
2. we need somewhere to mount our component, so our render function creates a
   container element using `document.createElement`.
4. using `ReactDOM.render` we render components into that container
5. React uses `body` to append all event handlers. We need to account for that,
   so we append our container to `body` using `document.body.appendChild`
6. query functions to get elements in the document. We use the exported
   `getQueriesForElement` from `dom-testing-library` to get all the different
   queries, and return them in our own `render` function
7. we also return our container so that we can inspect it directly
8. because we've mounted our component using React, and appended it to the DOM,
   we need to do some cleanup. We return a `cleanup` function in render that
   first unmounts our component using `ReactDOM.unmountComponentAtNode` which
   accepts the container we mounted our component at. We also use
   `document.body.removeChild` to remove our component from the DOM. `cleanup`
   will need to be used after every test to ensure that subsequent tests do not
   contain previously rendered components.

## 2. Use `dom-testing-library` with Preact

```bash
$ npx jest preact
```

[`preact.test.js`](./__tests__/preact.test.js)

To manually render Preact components:

1. we need a `render` function
2. in that render function we need a container on which we can mount our
   components, so we create one with `document.createElement('div')`
3. we then use `Preact.render(ui, container)` to render our component on that
   container
4. we then need query methods to assert on rendered elements, so we export the
   result of applying `container` to `dom-testing-library`s
   `getQueriesForElement` function, spreading it
5. we return the container, too


Preact doesn't render synchronously, as React does. When firing events that
change state, Preact will only render those updates at the next tick of the
event loop.

We have 2 strategies available to us handle this:

1. wrap our assertion in a `setTimeout` with a delay of 0
2. use `async await` with `dom-testing-library`s `wait` function to wait for the
  next tick of the event loop before asserting

```javascript
  // wait for render updates using setTimeout
  fireEvent.click(button)

  setTimeout(() => {
    expect(something).toBe(true)
  })
```

```javascript
  // wait for render updates using async await
  test('something', async () => {
    // ...

    fireEvent.click(button)

    await wait()

    expect(something).toBe(true)
  })
```

Using `async await` is cleaner, and we can clean things up further by extending
`dom-testing-library`s `fireEvent` by making every method `async`:

[`fire-event-async.js`](./__tests__/helpers/fire-event-async.js)

Instead of firing an event, waiting, and then asserting, we have now combined
the event firing and waiting into one function:

```javascript
  test('something', async () => {
    // ...

    await fireEventAsync.click(button)

    expect(something).toBe(true)
  })
```

## 3. Use `dom-testing-library` with jQuery

```bash
$ npx jest jquery
```

To test `jquery` components we use `getQueriesForElement` on a section of DOM
that we can create using jQuery.

## 4. Use `dom-testing-library` with Dojo

Unlikely to ever use Dojo / not interested in using it.

## 5. Use `dom-testing-library` with HyperApp

```bash
$ npx jest hyperapp
```

As with Preact, HyperApp updates state only at the end of each tick. In addition
to state, HyperApp does this when rendering, too.

To account for this, we need to make our custom `render` function async, and
`await` the result of rendering before making any assertions or queries.

## 6. Use `dom-testing-library` with AngularJs

Unlikely to ever use AngularJs / not interested in using it.

## 7. Use `dom-testing-library` with Angular

Unlikely to ever use Angular / not interested in using it.

## 8. Use `dom-testing-library` with Vue

```bash
$ npx jest vue
```

Vue is similar to Preact as it updates state at the end of each event loop. We
need to use `async / await` when asserting on events that result in state being
updated.

## 9. Use `dom-testing-library` with Mithril

```bash
$ npx jest mithril
```

Mithril differs from other libraries that are asynchronous. Mithril doesn't
update the DOM in a deterministic amount of time, such as at the end of the
event loop.

To account for this, we need to use a callback inside `dom-testing-library`s
`wait` function. This will continuously call the assertion within a 4000ms
window until the assertion passes, otherwise failing the test.

## 10. Use `dom-testing-library` with Svelte

```bash
$ npx jest svelte
```

Svelte operates synchronously, as does React, so no need for `async / await` for
state updates.

## 11. Use `dom-testing-library` with `from-html`

```bash
$ npx jest from-html
```

`from-html` leaves it up to the user to manage state etc. Events are handled
synchronously, so there's no need for `async / await`.
