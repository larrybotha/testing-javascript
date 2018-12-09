import Vue from 'vue/dist/vue';

Vue.config.productionTip = false;

const Counter = {
  template: `
    <div>
      <button @click='increment'>
        {{count}}
      </button>
    </div>
  `,
  data: () => ({count: 0}),
  methods: {
    increment() {
      this.count++;
    },
  },
};

export {Counter};
