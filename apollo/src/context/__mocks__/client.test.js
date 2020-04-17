const mockContext = require('./index');


// console.log(mockContext.updateEvent)

function sum(a, b) {
  return a + b;
}



test('adds numbers', async () => {
  expect(sum(1, 2)).toBe(3);
})