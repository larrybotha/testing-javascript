import m from 'mithril';

const Counter = () => {
  let count = 0;

  return {
    view: () =>
      m(
        'button',
        {
          onclick: () => {
            count++;
          },
        },
        count
      ),
  };
};

export {Counter};
