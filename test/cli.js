const tape = require('tape');

tape.test('cli', test => {
  test.plan(3);

  test.skip('Help should be shown if no args used');

  test.skip('stdin should be processed if provided');

  test.skip('Globs should be processed if stdin not provided');
});
