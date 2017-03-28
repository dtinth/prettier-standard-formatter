const tape = require('tape');
const index = require('../src/index');
const lib = require('../src/lib');

tape.test('index', test => {
  test.plan(2);

  test.equal(index, lib.format, 'index should export lib.format');

  test.equal(typeof index, 'function', 'index should be a function');
});
