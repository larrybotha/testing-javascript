// our shared mock of utils
// Check source of  05-make-a-shared-mock-module.test.js where this mock is
// imported
module.exports = {
  getWinner: jest.fn((p1, p2) => p1),
};
