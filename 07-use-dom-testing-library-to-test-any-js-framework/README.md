# Use `dom-testing-library` to test any JS framework

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
$ npx jest jquery --watch
```

To test `jquery` components we use `getQueriesForElement` on a section of DOM
that we can create using jQuery.

## 4. Use `dom-testing-library` with Dojo

Unlikely to ever use Dojo / not interested in using it.
