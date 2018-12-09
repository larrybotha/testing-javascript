import fromHtml from 'from-html/lib/from-html';

class Counter {
  constructor() {
    fromHtml(
      `
      <div ref="container">
        <button ref="counter" on="click">
          0
        </button>
      </div>
      `,
      this,
      'refs'
    );
  }

  mount(target) {
    target.append(this.refs.container);
  }

  handleEvent({type}) {
    if (type === 'click') {
      const {counter} = this.refs;

      counter.textContent = Number(counter.textContent) + 1;
    }
  }
}

export {Counter};
