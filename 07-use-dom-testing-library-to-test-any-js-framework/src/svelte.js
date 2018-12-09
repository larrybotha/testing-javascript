import * as svelte from 'svelte';

const counterTemplate = `
  <div>
    <button on:click='set({ count: count + 1 })'>
      {count}
    </button>
  </div>
`;

export {counterTemplate};
