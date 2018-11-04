const fn = (impl = () => {}) => {
  const mockFn = (...args) => {
    mockFn.mock.calls.push(args);

    return impl(...args);
  };

  mockFn.mock = {calls: []};
  mockFn.mockImplementation = newImpl => (impl = newImpl);

  return mockFn;
};

module.exports = {
  getWinner: fn((p1, p2) => p1),
};
