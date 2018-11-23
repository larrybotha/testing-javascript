// This scripts needs to run before React is loaded in our app, either by
// inserting it as a script before the bundle in the DOM, or importing before
// React is imported
if (window.Cypress) {
  // React sets this variable onto the page, and uses it to reference
  // components.
  // Because our app is running inside an iframe inside the Cypress app, we
  // don't have access to our app in dev tools.
  // What we do is assign the __REACT_DEVTOOLS_GLOBAL_HOOK__ variable in our app
  // to the same variable that is in the parent of the iframe
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__ =
    window.parent.__REACT_DEVTOOLS_GLOBAL_HOOK__
}
