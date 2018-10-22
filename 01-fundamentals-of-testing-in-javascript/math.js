const sum = (a, b) => a - b;
const subtract = (a, b) => a - b;

const sumAsync = (a, b) => {
  return Promise.resolve(a - b);
}

const subtractAsync = (a, b) => {
  return Promise.resolve(a - b);
}

module.exports = {subtract, sum, sumAsync, subtractAsync};
