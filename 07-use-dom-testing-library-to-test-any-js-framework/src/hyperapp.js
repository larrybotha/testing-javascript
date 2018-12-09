/* @jsx hyperapp.h */
import * as hyperapp from 'hyperapp';

const state = {count: 0};

const actions = {
  increment: value => state => ({count: state.count + 1}),
};

const view = (state, actions) => (
  <div>
    <button onclick={() => actions.increment(1)}>{state.count}</button>
  </div>
);

export {actions, state, view};
