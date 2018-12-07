import {fireEvent, wait} from 'dom-testing-library';

const fireEventAsync = {};

// extend fireEvent so that it's async
Object.entries(fireEvent).reduce((obj, [key, val]) => {
  // for each key in fireEvent, replace the value with an async function that
  // waits for a response before returning a value
  obj[key] = async (...args) => {
    const ret = val(...args);

    await wait();

    return ret;
  };

  // return our newly extend fireEvent with all methods made async
  return obj;
}, fireEventAsync);

export {fireEventAsync};
