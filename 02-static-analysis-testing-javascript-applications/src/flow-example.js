// @flow
// to run flow against files, we need a flow pragma to be defined at the top of
// the file
function add(a: number, b: number): number {
  return a + b;
}

type User = {
  name: {
    first: string,
    middle: string,
    last: string,
  },
};

function getFullName(user: User): string {
  const {
    name: {first, middle, last},
  } = user;

  return [first, middle, last].filter(Boolean).join(' ');
}

// type error
add('1', 2);

// another type error
getFullName({name: {first: 'Joe', middle: false, last: 'Matthews'}});
